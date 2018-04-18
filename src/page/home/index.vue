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
      ...mapGetters([
        'vertoHandle',
        'group_users',
        'deviceList',
        'currentLoginUser'
      ]),
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
            onDialogState(data) {
              console.log("监听状态中")

            },
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
                user.channelUUID == channelUUID;
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
                user.channelUUID == channelUUID;
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
