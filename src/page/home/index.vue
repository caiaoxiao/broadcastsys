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
      return {}
    },
    created() {
      this.$nextTick(function() {
        // 初始化vertoHandle
        $.verto.init({}, this.initVertoHandle);

      })
    },
        computed: {
      ...mapGetters({
        vertoHandle:'vertoHandle',
        group_users:'group_users',
        users:'users',
        currentLoginUser:'currentLoginUser',
        deviceList:'deviceList',
        callQueue:'callQueue'
      }),
    },
    watch: {
      'callQueue': function(call) {
                if(call[0].caller=='1002');
		{
	        var url = 'screen.html' 
		var s1 =  "?s1=http://192.168.1.33:8080/tKLk3X2yLb5Iptzio06dU52GNG9HhlSi/embed/eIJvmiC/ZRXTod4Th2/jquery|fullscreen"; 	
		var s2 =  "" //&s2=http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
		var s3 =  "" // &s3=http://www.w3school.com.cn/example/html5/mov_bbb.mp4";
		var s4 =  "" //&s4=https://media.w3.org/2010/05/sintel/trailer.mp4";
		window.open(url+s1+s2+s3+s4,'newwindow','height=1920,width=1080,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,location=no, status=no');
		}
               // this.$router.push({path:'/video'});
      }
    },
    methods: {
      initVertoHandle(status) {
        let _this = this
        this.$store.dispatch('setVertoInit',
          new jQuery.verto({
            login: '1008'+'@'+ window.location.hostname,
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
              console.log('onWSLogin', success);
            },
            onWSClose(verto, success) {
              console.log('onWSClose', success);
            },
	    onDialogState: function(d) {
            let arr = []
            let callType = d.direction.name
              if (d.cause == "USER_NOT_REGISTERED")
              {
                //do nothing 
              }
              else {
              switch (d.state.name) {
                case "trying":
                  break;
                case "ringing":       // 振铃，装载进队列
                  arr.push({
                    curCall: d,
                    state: d.state.name,
                    caller: d.params.caller_id_number,
		    des:d.params.callee_id_number
                  })
                  _this.$store.dispatch('setCallQueue', arr)
                  break;
                case "requesting":
                  arr.push({
                    curCall:d, 
                    state: d.state.name,
                    caller: d.params.caller_id_number,
		    des:d.params.destination_number
                  })
                   _this.$store.dispatch('setCallQueue',arr)
		break;
                case "answering":     // 接听电话，改变状态
                  break;
                case "active":
                  break;
                case "hangup":        //  拒接，改变状态
                  arr = _this.$store.getters.callQueue
                  arr.forEach(function(a, i){
                    if(a.caller == d.params.caller_id_number &&  (a.des == d.params.destination_number || a.des==d.params.callee_id_number)) {
                      arr.splice(i,1);
                    }
                  })
                  _this.$store.dispatch('setCallQueue', arr)
                  console.log("Call ended with cause: " + d.cause);
                  break;
                case "destroy":
                  // Some kind of client side cleanup...
                  break;
		default:
			console.log(d.state.name);
              }
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
//        let xuiUsername = localStorage.getItem('xui.username')
        let xuiUsername = 1008 // 过滤掉登陆者
        this.$store.dispatch('setCurrentLoginUser',{
          deviceState: "registered",
          userID: xuiUsername,
          callDirection: null,
          channelUUID: null
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
              if(r.reg_user != xuiUsername) {
                user.deviceState = "registered"
                user.userID = r.reg_user
                user.callDirection = null
                user.channelUUID = null
                user.networkIP = r.network_ip
                user.networkPort = r.network_port 
                deviceList.push(user)
              }
            })
            if (deviceList.length) this.$store.dispatch('setDeviceList',deviceList)

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
            if(d.userID == e.data.username) {
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
            deviceList.push(user)

          }

        }else if( e.eventChannel =='FSevent.custom::sofia::unregister') {
          deviceList.forEach(function(d, i) {
            if (d.userID == e.data.username) {
              deviceList.splice(i,1)
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
            }
          }
        )
      },
      handleFSEventChannel(v, e) {
        let callDirection = e.data["Call-Direction"];            //入栈还是出栈
        let callerNumber = e.data["Caller-Caller-ID-Number"];    //主叫号码
        let calleeNumber = e.data["Caller-Destination-Number"];  //被叫号码
        let channelUUID = e.data["Unique-ID"];                   //id
        let channelCallState = e.data["Channel-Call-State"];     //通话状态
        let currentLoginUser = this.currentLoginUser;
        let users = this.deviceList;
        let currentLoginUserChanged = false;
        let usersChanged = false;

        if (callerNumber == "0000000000") return;

        if (channelCallState == "RINGING") {
          channelCallState = "ringing";
        } else if (channelCallState == "ACTIVE") {
          channelCallState = "active";
        } else if (channelCallState == "HANGUP") {
          channelCallState = "register";
        }
        // 入栈
        if (callDirection == "inbound") {
          if (currentLoginUser.userID  == callerNumber) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.channelCallState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          } else {
            users.forEach(function(user) {
              if (user.userID  == callerNumber) {
                user.channelUUID = channelUUID;
                user.deviceState = channelCallState;
                user.callDirection = callDirection;
                usersChanged = true;
              }
            })

          }

          // 出栈
        } else if (callDirection == "outbound") {
          if (currentLoginUser.userID  == calleeNumber) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.channelCallState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          } else {
            users.forEach(function(user) {
              if (user.userID  == calleeNumber) {
                user.channelUUID = channelUUID;
                user.deviceState = channelCallState;
                user.callDirection = callDirection;
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
