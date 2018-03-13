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
  import {itemClick,isArray,isObject,isString} from 'utils/page/meeting'
  import { topMenu, footNav, container } from 'components'
  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      //  初始化vertoHandle
      this.$nextTick(function() {
        $.verto.init({}, this.bootstrap);
      })
    },
    computed: {
      ...mapGetters({
        vertoHandle: 'vertoHandle',
        group_users: 'group_users',
        users: 'users',
        currentLoginUser: 'currentLoginUser'
      }),
    },
    methods: {
      bootstrap(status) {
        let $this = this
        this.$store.dispatch('setVertoInit', new jQuery.verto({
          login: 1008+'@'+ window.location.hostname,
          passwd: '1234',
          socketUrl: 'wss://'+ window.location.hostname +':8082',
          ringFile: 'sounds/bell_ring2.wav',
          videoParams: {
            "minWidth": "1280",
            "minHeight": "720",
            "minFrameRate": 30
          },
          iceServers: [],
          deviceParams: {
            useMic: "any",
            useSpeak: "any"
          },


        }, {
          onWSLogin: function(verto, success) {
            $this.refresh()
            console.log('onWSLogin', success);
          },
          onWSClose: function(verto, success) {
            console.log('onWSClose', success);
          },
          /*onDialogState: function(d) {
            let arr = []
            let item = {
                state: d.state.name,
                num: d.params.remote_caller_id_number
            }

            console.log("dddd",d)
            switch (d.state.name) {
              case "trying":
                break;
              case "ringing":       // 振铃，装载进队列
                arr.push(item)
                $this.$store.dispatch('setCallQueue', arr)
                break;
              case "answering":     // 接听电话，改变状态

                break;
              case "active":
                break;
              case "hangup":        //  拒接，改变状态
                arr = $this.$store.getters.callQueue
                arr.forEach(function(a, i){
                  if(a.num == d.params.remote_caller_id_number) {
                    arr[i].state = d.state.name
                  }
                })
                $this.$store.dispatch('setCallQueue', arr)
                console.log("Call ended with cause: " + d.cause);
                break;
              case "destroy":
                // Some kind of client side cleanup...
                break;
            }


          }*/
        }))
      },
      // 查询所有设备 以及事件初始化
      refresh() {
//        let xuiUsername = localStorage.getItem('xui.username')
        let xuiUsername = 1008 // 过滤掉登陆者
        let group_users = {};
        let users = [];
        let currentLoginUser = {};
        this.$ajax.get('api/groups/group_users',{})
          .then(function(res)  {
            let result = res.data
            console.log("user_groups", result);
            result.forEach(function(d) {
              let user = {};
              let groupName = d.groupName;
              if (!groupName) groupName = "ungrouped";
              if (!group_users[d.groupID]) {
                user = {groupID:d.groupID, groupName:groupName,  userExten:d.userExten, userID:d.userID, userName:d.userName, userDomain:d.userDomain};
                if (d.userName != xuiUsername && d.userExten != "admin") {
                  group_users[d.groupID] = {groupID: d.groupID, groupName:groupName, users:[user]};
                } else if (d.userName == xuiUsername) {
                  currentLoginUser = user;
                }
              } else {
                user = {groupID:d.groupID, userExten:d.userExten, userID:d.userID, userName:d.userName, userDomain:d.userDomain};
                if (d.userName != xuiUsername && d.userExten != "admin") {
                  group_users[d.groupID].users.push(user);
                } else if (d.userName == xuiUsername) {
                  currentLoginUser = user;
                }
              }

              user.registerState = "unregistered";
              currentLoginUser.registerState = "registered";
              user.selectedState = currentLoginUser.selectedState = "unselected";
              user.channelCallState = currentLoginUser.channelCallState = "idle";
              user.channelUUID = currentLoginUser.channelUUID = null;
              user.callDirection = currentLoginUser.callDirection = null;
              users.push(user);
            })

            this.$store.dispatch('setGroupUsers', group_users.ungrouped.users )           // 分组数据
            this.$store.dispatch('setUser', users )                                       // 所有数据
            this.$store.dispatch('setCurrentLoginUser', currentLoginUser )                // 当前用户

            console.log( group_users)
            console.log(users)
            console.log(currentLoginUser)

            this.syncUserRegisterStatus();

          }.bind(this))
          .catch((e) => {
            console.log("get group_users ERR");
          });
        /*
         this.handleGetRegister()
         this.handleGetCallOrRinging()*/
        // 订阅注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::register", {handler: this.handleFSEventRegister.bind(this)});
        // 订阅取消注册事件
        this.vertoHandle.subscribe("FSevent.custom::sofia::unregister", {handler: this.handleFSEventRegister.bind(this)});
        this.vertoHandle.subscribe("FSevent.channel_callstate", {handler: this.handleFSEventChannel.bind(this)});
      },
      // 注册事件 和 取消注册事件
      handleFSEventRegister(v, e) {
        let registerState = "unregistered";
        let usersChanged = false;
        if (e.eventChannel == "FSevent.custom::sofia::register") {
          registerState = "registered";
        }
        this.users.forEach(function(u) {
          if (u.userExten == e.data.username) {
            usersChanged = true;
            u.registerState = registerState;
          }
        })
        this.$store.dispatch('setUser',Object.assign([], this.users))
      },
      //  获取已注册的设备状态
      syncUserRegisterStatus() {
        let _this = this;
        this.vertoHandle.sendMethod("jsapi",{command:"fsapi", data:{cmd:"show", arg:"registrations as xml"}},
          function(data) {
            let users = [];
            const parser = new DOMParser();
            const doc = parser.parseFromString(data.message, "text/xml");
            const msg = parseXML(doc);

            let registrations = [];

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
              users = _this.users.map(function(u) {
                if (u.userExten == r.reg_user) {
                  u.registerState = "registered";
                }
                return u;
              });
            });

            if (users.length) _this.$store.dispatch('setUser',users)

          },function(data) {
            console.log("error:"+data)
          }.bind(this))
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
        let callDirection = e.data["Call-Direction"];
        let callerNumber = e.data["Caller-Caller-ID-Number"];
        let calleeNumber = e.data["Caller-Destination-Number"];
        let channelUUID = e.data["Unique-ID"];
        let channelCallState = e.data["Channel-Call-State"];
        let currentLoginUser = this.currentLoginUser;
        let users = this.users;
        let currentLoginUserChanged = false;
        let usersChanged = false;

        if (callerNumber == "0000000000") return;

        if (channelCallState == "RINGING") {
          channelCallState = "ringing";
        } else if (channelCallState == "ACTIVE") {
          channelCallState = "active";
        } else if (channelCallState == "HANGUP") {
          channelCallState = "idle";
        }
        // 呼入
        if (callDirection == "inbound") {
          if (currentLoginUser.userExtn == callerNumber) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.channelCallState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          } else {
            users.forEach(function(user) {
              if (user.extn == callerNumber) {
                user.channelUUID == channelUUID;
                user.channelCallState = channelCallState;
                user.callDirection = callDirection;
                usersChanged = true;
              }
            })

          }
          // 呼出
        } else if (callDirection == "outbound") {
          if (currentLoginUser.userExtn == calleeNumber) {
            currentLoginUser.channelUUID = channelUUID;
            currentLoginUser.channelCallState = channelCallState;
            currentLoginUser.callDirection = callDirection;
            currentLoginUserChanged = true;
          } else {
            users.forEach(function(user) {
              if (user.extn == calleeNumber) {
                user.channelUUID == channelUUID;
                user.channelCallState = channelCallState;
                user.callDirection = callDirection;
                usersChanged = true;
              }
            })
          }
        }

        if (currentLoginUserChanged) this.setState({currentLoginUser: currentLoginUser});

        if (usersChanged) this.setState({users: users});
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
