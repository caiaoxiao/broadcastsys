<template>
  <div>
    <header>
      <div class="user">
        <div @click="returnSystem()"><i class="fa fa-reply"></i> 返回系统</div>
      </div>
      <div class="sysName">
        <div><i class="fa fa-cogs"></i>系统管理</div>
      </div>
      <ul class="settingMenu" @tab-click="tabClick">
        <li class="li-tab"
            v-for="(item,index) in tabsParam"
            @click="toggleTabs(index)"
            :class="{selected:index==nowIndex}">
          <div>{{item}}</div></li>
      </ul>
    </header>
    <user v-show="nowIndex===0"></user>
    <userGroup v-show="nowIndex===1"></userGroup>
    <device v-show="nowIndex===2"></device>
    <deviceGroup v-show="nowIndex===3"></deviceGroup>
    <Organization v-show="nowIndex===4"></Organization>
  </div>
</template>
<script>
  import { mapGetters,mapActions } from 'vuex'
  import parseXML from 'utils/xml_parser'
  import user from './user/index.vue'
  import userGroup from './userGroup/index.vue'
  import device from './device/index.vue'
  import deviceGroup from './deviceGroup/index.vue'
  import Organization from './Organization/index.vue'
  export default {
    data() {

      return{
        nowIndex:0,
        tabsParam:['用户管理','用户组管理','设备管理','设备组管理','机构管理']
      }

    },
    computed: {
      ...mapGetters({
        deviceList: 'deviceList',    // 所有设备
        vertoHandle:'vertoHandle',
        currentLoginUser:'currentLoginUser',

      })
    },
    created() {
      this.$nextTick(function() {
        // 初始化vertoHandle

        if(this.vertoHandle==null)
          $.verto.init({}, this.initVertoHandle);
        else
          console.log('verto aleray not null')
      })
    },
    components: {
      user,
      userGroup,
      device,
      deviceGroup,
      Organization
    },
    watch: {
      'callQueue': function(call) {
        if(call[0].des=='9110');
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
      toggleTabs:function(index){
        this.nowIndex=index;
      },
      returnSystem(){
        this.$router.push('/');
      },
      //设备相关
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


            },

            onMessage:function(verto, dialog, message, data) {
              console.log('this is a message',message)
              let _this = this
              var initLiveArray =  function(verto, dialog, data,pbx,room) {
                // Set up addtional configuration specific to the call.
                var config = {subParams: {callID: dialog ? dialog.callID : null},};
                // Set up the live array, using the live array data received from FreeSWITCH.
                _this.liveArray = new $.verto.liveArray(verto,pbx,room, config);
                // Subscribe to live array changes.
                _this.liveArray.onChange = function(liveArrayObj, args) {
                  try {
                    switch (args.action) {

                      // Initial list of existing conference users.
                      case "bootObj":
                        break;

                      // New user joined conference.
                      case "add":
                        console.log('conference user added')
                        break;

                      // User left conference.
                      case "del":
                        console.log('conference user deleted')
                        break;

                      // Existing user's state changed (mute/unmute, talking, floor, etc)
                      case "modify":
                        console.log('conference user changed')
                        break;

                    }
                  } catch (err) {
                    console.error("ERROR: " + err);
                  }
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
                        console.log('part')
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
        debugger
//        let xuiUsername = localStorage.getItem('xui.username')
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
              if(r.reg_user != xuiUsername) {
                user.deviceState = "registered"
                user.userID = r.reg_user
                user.callDirection = null
                user.channelUUID = null
                user.networkIP = r.network_ip
                user.networkPort = r.network_port
                user.operationState = 0
                user.oppoChannelUUID = null
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
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi",{
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
    }
  }
</script>
