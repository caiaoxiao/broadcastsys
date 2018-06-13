<template>
  <div>
    <topMenu></topMenu>
    <container></container>
    <footNav></footNav>
  </div>
</template>

<script>
  import parseXML from 'utils/xml_parser';
  import { mapGetters,mapActions } from 'vuex'
  import {isArray,isObject,isString} from 'utils/tool'
  import { topMenu, footNav, container } from 'components'
  export default {
    data () {
      return {
        liveArray:{},
        vertoConf:{},
        group_list:[],
	usermap:{},
	last_id:"",	
      }
    },
    created() {
      this.$nextTick(function() {
        // 初始化vertoHandle
        //if(this.vertoHandle==null)
          $.verto.init({}, this.initVertoHandle);
        //else
        //  console.log('verto aleray not null')

      })
    },
    computed: {
      ...mapGetters({
        vertoHandle:'vertoHandle',
        group_users:'group_users',
        users:'users',
        currentLoginUser:'currentLoginUser',
        deviceList:'deviceList',
        deviceGroup:'deviceGroup',
        callQueue:'callQueue',
        confLeft:'confLeft',
        confAlarm:'confAlarm',
	confIpBoard: 'confIpBoard'
      }),
    },
    watch: {
      'callQueue':function(conf) { 
	},
      'confAlarm': function(conf) {
        if(conf.length>0 && !conf.some(function(item,indexs,array){return item.caller_id_number=='9000'}))
        {
	if(this.callQueue.some(function(item,index,array){return  item.des=='9000'}))
	 this.vertoHandle.hangup()
	 this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: '9110',
          caller_id_name: "LegalHigh",
          caller_id_number: "9000",
          outgoingBandwidth: "default",
          incomingBandwidth: "default",
          useStereo: true,
          dedEnc: false,
          tag: "video-container",
          deviceParams: {
            useMic: "any",
            useSpeak: "any",
            useCamera: "any"
          }
        }) 
          
        }
       else if(conf.length>0 && conf.every(function(item,index,array){return item.caller_id_number=='9000'}))
	{	
	   let _this = this
	   conf.forEach(function(item){
           _this.fsAPI('conference','9110-scc.ieyeplus.com'+' ' +'hup'+' '+item.conf_id) 
		})
	   this.$store.dispatch('setConfAlarm',[])
	}
      }
    },
    methods: {
      initVertoHandle(status) {
        let _this = this
        this.$store.dispatch('setVertoInit',
          new jQuery.verto({
            login: '9000'+'@'+ window.location.hostname,
            passwd: '1234',
            socketUrl: 'wss://'+ window.location.hostname +':8082',
            ringFile: 'sounds/bell_ring2.wav',
            videoParams: {
              "minWidth": "1280",
              "minHeight": "720",
              "minFrameRate": 30
            },
            iceServers: [],
            tag: "audio-container",
            deviceParams: {
              useMic: "any",
              useSpeak: "any"
            },
          }, {
            onWSLogin(verto, success) {
              // 登录回调
              _this.refresh()
	      _this.handleGetCallOrRinging()
              console.log('onWSLogin', success);
            },
            onWSClose(verto, success) {
              console.log('onWSClose', success);
            },
            onDialogState: function(d) {
              let callType = d.direction.name
              if (d.cause == "USER_NOT_REGISTERED")
              {
                //do nothing
              }
              else {
                let arr = _this.$store.getters.callQueue
                switch (d.state.name) {
                  case "trying":
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "trying"
                            break}
                    }
                    if(i==arr.length){
                      arr.push({
                      curCall: d,
                      state: d.state.name,
                      caller: d.params.caller_id_number,
                      des:d.params.callee_id_number
                    })
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "ringing":       // 振铃，装载进队列
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "ringing"
                            break}
                    }
                    if(i==arr.length){
                    arr.push({
                      curCall: d,
                      state: d.state.name,
                      caller: d.params.caller_id_number,
                      des:d.params.callee_id_number
                    })
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "requesting":
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "requesting"
                            break}
                    }
                    if(i==arr.length){
                    arr.push({
                      curCall: d,
                      state: d.state.name,
                     caller: d.params.caller_id_number,
		     des:d.params.destination_number 
                     
                    })
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "answering":     // 接听电话，改变状态
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "answering"
                            break}
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "active":
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "active"
                            break}
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "hangup":        //  拒接，改变状态
                    for(var i =0 ;i < arr.legnth;i++){
                      if(arr[i].caller==d.params.caller_id_number)
                            {arr[i].state = "hangup"
                            break}
                    }
                    _this.$store.dispatch('setCallQueue', arr)
                    break
                  case "destroy":
                    arr.forEach(function(a, i){
                    if(a.caller == d.params.caller_id_number) {
                      arr.splice(i,1);
                    }
                    })
                    _this.$store.dispatch('setCallQueue', arr)
                    console.log("Call ended with cause: " + d.cause);
                    break;
                  default:
                    console.log(d.state.name);
                }
              }


            },

            onMessage:function(verto, dialog, message, data) { 
              var initLiveArray =  function(verto, dialog, data,pbx,room) {
                // Set up addtional configuration specific to the call.
                var config = {subParams: {callID: dialog ? dialog.callID : null},};
                // Set up the live array, using the live array data received from FreeSWITCH.
                _this.liveArray = new $.verto.liveArray(verto,pbx,room, config);
                // Subscribe to live array changes.
                _this.liveArray.onChange = function(liveArrayObj, args) {
                let device = _this.$store.getters.deviceList
		let action = ""
		let arr =[]
		let hash = Object.keys(liveArrayObj.hash())
			if(liveArrayObj.name == '9100-scc.ieyeplus.com')
                                {
				arr = _this.$store.getters.confLeft
				action = 'setConfLeft'
				}
			else if(liveArrayObj.name =='9110-scc.ieyeplus.com')
				{
				arr = _this.$store.getters.confAlarm
				action = 'setConfAlarm'
				}
			else if(liveArrayObj.name =='9111-scc.ieyeplus.com')
				{
				arr = _this.$store.getters.confIpBoard
				action = 'setConfIpBoard'
				}
			else if(liveArrayObj.name =='9112-scc.ieyeplus.com')
                                {
                                arr = _this.$store.getters.confMeeting
                                action = 'setConfMeeting'
                                }
                  try {
                    switch (args.action) {

                      // Initial list of existing conference users.
                      case "bootObj":
                        break;

                      // New user joined conference.
                      case "add":
		      if(args.data[1]!='9000'){
                      device.forEach(function(user) {
                            if(user.userID == args.data[1])  {
                                user.deviceState = 'active'
				user.calling = liveArrayObj.name.slice(0,liveArrayObj.name.indexOf('-'))
				if(user.timer.clock == false){
                                var t = setInterval(()=>{
                                 user.timer.s+=1
                                if(user.timer.s>59.5){
                                  user.timer.s=0
                                  user.timer.m+=1}
                                if(user.timer.s>59.5 || user.timer.m>59){
                                  user.timer.m=0
                                  user.timer.h+=1}
                                  },1000)
				user.timer.clock = true
                                user.timer.id.push(t) 
				}
                            }
                        })
                        _this.$store.dispatch('setDeviceList',device)}
			console.log('conference user added')
	                var  data = JSON.parse(args.data[4])
                        arr.push({
                          conf_id : parseInt(args.data[0]).toString(),
                          caller_id_number : args.data[1],
                          muted : data["audio"]["muted"],
                          deaf :  data["audio"]["deaf"],
                          talking : data["audio"]["talking"],
                          channel_uuid : hash[arr.length], 
                          key : args.key

                        })
                        _this.$store.dispatch(action,arr)
			if( liveArrayObj.name =='9110-scc.ieyeplus.com' && args.data[1]!='9000')
			{
			let deviceCode = args.data[1]
			_this.$ajax.post('Basic/List')
				.then(res=>{
					if (res.data.code === 1 && res.data.result.length>0){ 
								let url = "http://scc.ieyeplus.com:8080/"+res.data.result[0].uniqueId+"/"+deviceCode 
								window.open(url,'newwindow','height=1920,width=1080,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=no, status=no')
						}
					})//device获取videourl
		}//liveArrayObj.name =='9110-scc.ieyeplus.com'i && args.data[1]!='9000'
			if((liveArrayObj.name =='9100-scc.ieyeplus.com')  && args.data[1]!='9000'){ 
                        _this.fsAPI('conference',liveArrayObj.name+' '+'stop'+' '+'all'+' '+ parseInt(args.data[0]).toString())
			_this.fsAPI('conference',liveArrayObj.name+' '+'play'+' '+'/usr/local/freeswitch/sounds/music/8000/danza-espanola-op-37-h-142-xii-arabesca.wav'+ ' '+ parseInt(args.data[0]).toString()) 
			}
                        break;

                      // User left conference.
                      case "del":
                        let device_del = _this.$store.getters.deviceList
                        device_del.forEach(function(user) {
                              if(user.channelUUID == args.key) {
                                  user.deviceState = 'register'
				  user.calling = null 
                                  user.timer.s=0
                                  user.timer.m=0
                                  user.timer.h=0
				  user.timer.clock = false
                                  user.timer.id.forEach((id)=>{clearInterval(id)})
                              }
                        })
                        _this.$store.dispatch('setDeviceList',device_del)
                        console.log('conference user deleted')
			                  arr.forEach(function(a,i){
                          if (a.key == args.key)
                            arr.splice(i,1)
                        })
                        _this.$store.dispatch(action,arr)
                        break;

                      // Existing user's state changed (mute/unmute, talking, floor, etc)
                      case "modify":
                        console.log('conference user changed')
			//console.log(args)
			var data = JSON.parse(args.data[4])
                        if(arr.length == 0 ||  arr.every(function(item,index,array){return item.key!=args.key}))
                        {
                                arr.push({
                                conf_id : parseInt(args.data[0]).toString(),
                                caller_id_number : args.data[1],
                                muted : data["audio"]["muted"],
                                deaf :  data["audio"]["deaf"],
                                talking : data["audio"]["talking"],
                                channel_uuid : hash[arr.length],
                                key : args.key })
                        }    
			else
			{
				arr.forEach(function(item,index){	
                                 if(item.key == args.key){
				arr[index].conf_id  =  parseInt(args.data[0]).toString(),
                                arr[index].caller_id_number =  args.data[1],
                                arr[index].muted =  data["audio"]["muted"],
                                arr[index].deaf =   data["audio"]["deaf"],
                                arr[index].talking =  data["audio"]["talking"],
                                arr[index].channel_uuid =  hash[index],
                                arr[index].key =  args.key 	
				}


				})



			}
			_this.$store.dispatch(action,arr)
                        break;

                    }
                 
                  } 
                    catch (err) { console.error("ERROR: " + err);}
                };
                // Called if the live array throws an error.
                _this.liveArray.onErr = function (obj, args) {
                  console.error("Error: ", obj, args);
                }
              }
              switch (message) {
                case $.verto.enum.message.pvtEvent:
                  if (data.pvtData) {
                    switch (data.pvtData.action) {
                      // This client has joined the live array for the conference.
                      case "conference-liveArray-join":
                        // With the initial live array data from the server, you can
                        // configure/subscribe to the live array.
                        break;
                      // This client has left the live array for the conference.
                      case "conference-liveArray-part":
                        // Some kind of client-side wrapup...
                        break;
                    }
                  }
                  break;
                // TODO: Needs doc.
                case $.verto.enum.message.info:
                  console.log('info')
                  break;
                // TODO: Needs doc.
                case $.verto.enum.message.display:
                  console.log('display')
                  break;
                case $.verto.enum.message.clientReady:
                  // 1.8.x+
                  // Fired when the server has finished re-attaching any active sessions.
                  // data.reattached_sessions contains an array of session IDs for all
                  // sessions that were re-attached.
                  initLiveArray(verto, dialog, data,"conference-liveArray.9100-scc.ieyeplus.com@scc.ieyeplus.com","9100-scc.ieyeplus.com");
                  initLiveArray(verto, dialog, data,"conference-liveArray.9110-scc.ieyeplus.com@scc.ieyeplus.com","9110-scc.ieyeplus.com");
                  initLiveArray(verto, dialog, data,"conference-liveArray.9111-scc.ieyeplus.com@scc.ieyeplus.com","9111-scc.ieyeplus.com");
                  initLiveArray(verto, dialog, data,"conference-liveArray.9112-scc.ieyeplus.com@scc.ieyeplus.com","9112-scc.ieyeplus.com");
                  console.log('verto channel ready')
                  break;
              }
            }
          }))
      },
      //  设备状态实时更新
      changeDeviceState(d,type) {
        if(type== "inbound") {

        }
      },
      // 查询所有设备 以及事件初始化
      refresh() {
//      let xuiUsername = localStorage.getItem('xui.username')
        let xuiUsername = 9000 // 过滤掉登陆者
        this.$store.dispatch('setCurrentLoginUser',{
          deviceState: "registered",
          userID: xuiUsername,
          callDirection: null,
          channelUUID: null,
          oppoChannelUUID: null
        })
        this.vertoHandle.sendMethod("jsapi",{command:"fsapi", data:{cmd:"show", arg:"registrations as xml"}},
          function(data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.message, "text/xml");
            const msg = parseXML(doc);

            let registrations = [];
            let deviceList = []
            if(msg) {
              if (isArray(msg.row)) {
                registrations = msg.row;
              } else if (isObject(msg.row)) {
                registrations.push(msg.row);
              } else if (isArray(msg)) {
                registrations = msg;
              } else if (isObject(msg)) {
                registrations.push(msg);
              }
            }
      registrations.forEach(function(r) {
              let user = {}
              if(r.reg_user != xuiUsername){ //(!deviceList.some((item)=>{return item.userID == r.reg_user})) 
                user.deviceState = "registered"
                user.userID = r.reg_user
                user.callDirection = null
                user.channelUUID = null
                user.networkIP = r.network_ip
                user.networkPort = r.network_port
                user.operationState = 0
                user.oppoChannelUUID = null
                user.groupid = []//this.usermap.hasOwnProperty(user.userID)?usermap[userID]:null
                user.timer = {s:0,m:0,h:0,id:[],clock:false}
                user.calling = null 
		user.name = null 
                deviceList.push(user)
              }/*
              else{
                deviceList.forEach((item,index)=>{ if(item.userID == r.reg_user)
                        deviceList[index].deviceState = "registered"
                        deviceList[index].userID = r.reg_user
                        deviceList[index].callDirection = null
                        deviceList[index].channelUUID = null
                        deviceList[index].networkIP = r.network_ip
                        deviceList[index].networkPort = r.network_port
                        deviceList[index].operationState = 0
                        deviceList[index].oppoChannelUUID = null
                        deviceList[index].groupid = this.usermap.hasOwnProperty(user.userID)?usermap[userID]:null
                        })

                }*/
            })	
	    this.$ajax.post('DeviceGroup/List')
        .then(res => {
          if (res.data.code === 1) {
            this.group_list = res.data.result
            for(let g in this.group_list)
              this.group_list[g].selected = false
            this.$store.dispatch('setUserGroup',this.group_list)
            this.group_list.forEach((item,index) => {
            this.$ajax.get(`DeviceGroup/Detail/${item.deviceGroupId}`)
            .then(res => {
              if (res.data.code === 1) {
                  let group  = res.data.result.deviceGroups
		  console.log(group)
                  group.forEach((r,i)=>{
                    if(this.usermap.hasOwnProperty(r.deviceCode)){
                      this.usermap[r.deviceCode].list.push(r.deviceGroupId)
                      this.usermap[r.deviceCode].type =r.type
		      this.usermap[r.deviceCode].name = r.deviceName
                    }
                    else{
                      this.usermap[r.deviceCode] = {}
                      this.usermap[r.deviceCode].list = [r.deviceGroupId]
                      this.usermap[r.deviceCode].type =r.type
		      this.usermap[r.deviceCode].name = r.deviceName
                    }
                  })
                }
             for(let index in deviceList){
              if(this.usermap.hasOwnProperty(deviceList[index].userID)){
                deviceList[index].groupid =  this.usermap[deviceList[index].userID].list
                deviceList[index].type =  this.usermap[deviceList[index].userID].type
	        deviceList[index].name = this.usermap[deviceList[index].userID].name
                delete this.usermap[deviceList[index].userID] }
             }
             for(let item in this.usermap){
               let user = {}
                user.deviceState = "unregistered"
                user.calling = ""
                user.userID = item
                user.callDirection = null
                user.channelUUID = null
                user.networkIP = null
                user.networkPort = null
                user.operationState = 0
                user.oppoChannelUUID = null
                user.groupid = this.usermap[item].list
                user.type = this.usermap[item].type
		user.name = this.usermap[item].name
                user.timer = {s:0,m:0,h:0,id:[],clock:false}
                deviceList.push(user)
              }   
          })
       })
    }
})
          this.$store.dispatch('setDeviceList',deviceList)
          }.bind(this),function(data) {
            console.log("error:"+data)
          }.bind(this))

        // 订阅注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::register", {handler: this.handleFSEventRegister.bind(this)});
        // 订阅取消注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::unregister", {handler: this.handleFSEventRegister.bind(this)});
        this.vertoHandle.subscribe("FSevent.channel_callstate", {handler: this.handleFSEventChannel.bind(this)});
      },
      // 注册事件 和 取消注册事件
      handleFSEventRegister(v, e) {
        let deviceList = this.deviceList
        if (e.eventChannel == 'FSevent.custom::sofia::register') {
          let isContinue = true
          deviceList.forEach(function(d, i) {
            if(d.userID == e.data.username ) {
	      if( deviceList[i].deviceState == "unregistered")
              deviceList[i].deviceState = "registered"
              isContinue=false
              return;
            }
          })

          if(isContinue) {
            let user = {}
            user.deviceState = "registered"
            user.userID = e.data['to-user']
            user.callDirection = null
            user.channelUUID = null
            user.groupid = this.usermap.hasOwnProperty(user.userID)?usermap[userID].list:[]
            user.type = this.usermap.hasOwnProperty(user.userID)?usermap[userID].type:""
	    user.timer = {s:0,m:0,h:0,id:[],clock:false}
	    user.name = this.usermap.hasOwnProperty(user.userID)?usermap[userID].name:null
            deviceList.push(user)

          }

        }else if( e.eventChannel =='FSevent.custom::sofia::unregister') {
          deviceList.forEach(function(d, i) {
            if (d.userID == e.data.username) {
              deviceList[i].deviceState = "unregistered"
            }
          })
        }

        this.$store.dispatch('setDeviceList',Object.assign([], deviceList))
      },
      //  获取正在振铃或者通话中的状态
      handleGetCallOrRinging() {
        let _this = this;
        this.vertoHandle.sendMethod("jsapi",{command:"fsapi", data:{cmd:"show", arg:"channels as xml"}},
          function(data) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.message, "text/xml");
            const msg = parseXML(doc);
            if(msg != 0) {
		console.log(msg)
            }
          }
        )
      },

      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi",{
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
      handleFSEventChannel(v, e) {
	//console.log(e)
        let callDirection = e.data["Call-Direction"];            //入栈还是出栈
        let callerNumber = e.data["Caller-Caller-ID-Number"];    //主叫号码
        let calleeNumber = e.data["Caller-Callee-ID-Number"];  //被叫号码
        let channelUUID = e.data["Unique-ID"];                   //id
        let channelCallState = e.data["Channel-Call-State"];  
        let currentLoginUser = this.currentLoginUser;
        let users = this.deviceList;
        let currentLoginUserChanged = false;
        let usersChanged = false;
        let _this = this;
	console.log(channelCallState)
        if (callerNumber == "0000000000") return;

        if (channelCallState == "RINGING" || channelCallState == "EARLY" || channelCallState == "RING_WAIT") {
          channelCallState = "ringing";
        } else if (channelCallState == "ACTIVE"){
          channelCallState = "active";
	  let time_add = 1 
          users.forEach(function(user) {
                  if(user.userID == callerNumber && !user.timer.clock) {
                      var t = setInterval(()=>{
                      user.timer.s+=time_add
                      if(user.timer.s>59.5){
                        user.timer.s=0
                        user.timer.m+=1}
                      if(user.timer.s>59.5 || user.timer.m>59){
                        user.timer.m=0
                        user.timer.h+=1}
                        },1000)
		      user.timer.clock = true
                      user.timer.id.push(t) 
                  }
                  else  if(user.userID == calleeNumber && !user.timer.clock) {
                      var t = setInterval(()=>{
                      user.timer.s+=time_add
                      if(user.timer.s>59.5 && user.timer.m<=59){
                        user.timer.s=0
                        user.timer.m+=1}
                      if(user.timer.s>59.5 && user.timer.m>59){
                        user.timer.m=0
                        user.timer.h+=1}
                        },1000)
		      user.timer.clock = true
                      user.timer.id.push(t) 
                  }
	            })
        } //number 
	    else if (channelCallState == "HANGUP") {
              users.forEach(function(user) {
             if((e.data.hasOwnProperty("Channel-Presence-ID") && user.userID == e.data["Channel-Presence-ID"].slice(0,e.data["Channel-Presence-ID"].indexOf('@'))) || (!e.data.hasOwnProperty("Channel-Presence-ID") && user.userID == e.data["Channel-Name"].slice(15,e.data["Channel-Name"].indexOf('@')))) {
		user.deviceState = "register"
		user.calling = null
		user.timer.s=0
		user.timer.m=0
		user.timer.h=0
		user.timer.clock = false 
		user.timer.id.forEach((id)=>{
                 clearInterval(id)	
		})
		}
		})
                channelCallState = "register";
        }
        // 入栈
        if (callDirection == "inbound") {
    
        /*  if ('9000' == callerNumber && '9001' == calleeNumber && channelCallState == 'ringing') {
            users.forEach(function(user) {
              if(user.operationState == 1) {
                user.operationState = 0;
                _this.fsAPI("uuid_bridge", channelUUID + " " + user.channelUUID, function(res) {console.log("qiang call")}.bind(this));
                usersChanged = true;
              }
              else if (user.operationState == 2) {
                user.operationState = 0
                _this.fsAPI("uuid_bridge", channelUUID + " " + user.oppoChannelUUID, function(res) {console.log("qiang delete")}.bind(this))
                usersChanged = true;
              }
              else if (user.operationState == 3) {
                user.operationState = 0
                _this.fsAPI("uuid_bridge", user.oppoChannelUUID + " " + channelUUID, function(res) {console.log("daijie")}.bind(this))
                usersChanged = true;
              }
            })
          }
          if (callerNumber == currentLoginUser.userID) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.deviceState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          }
            users.forEach(function(user) {
              if (user.userID  == callerNumber) {
                user.channelUUID = channelUUID;
                user.deviceState = channelCallState;
                user.callDirection = callDirection;
                user.calling = channelCallState=="active"?calleeNumber:null 
                usersChanged = true;
              }
	      else if(user.userID  == calleeNumber) {
                user.channelUUID = channelUUID;
                user.deviceState = channelCallState;
                user.callDirection = callDirection;
                user.calling = channelCallState=="active"?callerNumber:null 
                usersChanged = true;
              }
            })

          // 出栈
        } else if (callDirection == "outbound") {
          if (currentLoginUser.userID  == calleeNumber) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.channelCallState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          }


          else {
            let opChannelUUID = e.data["Other-Leg-Unique-ID"];

            users.forEach(function(user){
              if(user.userID == callerNumber) {
                user.oppoChannelUUID = channelUUID;
                usersChanged = true;
              }
            })

            users.forEach(function(user) {
              if (user.userID  == calleeNumber) {
                user.channelUUID = channelUUID;
                user.deviceState = channelCallState;
                user.callDirection = callDirection;
                user.oppoChannelUUID = opChannelUUID;
                user.calling = channelCallState=="active"?callerNumber:null
                usersChanged = true;
              }
            })
          }
        }
        if (currentLoginUserChanged) this.$store.dispatch('setCurrentLoginUser', currentLoginUser);
        if (usersChanged) this.$store.dispatch('setDeviceList',users)
      },
    },
    components: {
      topMenu,
      footNav,
      container
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
