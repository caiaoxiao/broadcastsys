<template>
  <div>
    <leftPhone></leftPhone>
    <div class="middleCon">
      <div class="memberList">
        <div class="module">
          <div class="moduleList">

            <div class="singleM" v-for="item in nowSession">
              <div class="moduleStyle calling "  @click.stop="itemClick($event, item)">
                <div class="moduleNum">{{ item.userExten }}</div>
                <div class="moduleKind">
                  通话终端
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>

          </div>
        </div>
        <div class="functionMenu">
          <ul class="nav nav-justified menuList">
            <li id="a1" @click="closeMeeting"><i class="fa fa-window-close-o fa-2x"  aria-hidden="true"></i><span>结束会议
            </span></li>
            <li id="a2" @click="publicFunction('unmute')">
              <i class="fa fa-microphone fa-2x" aria-hidden="true"></i>
              <span>允许发言</span>
            </li>
            <li id="a3" @click="publicFunction('mute')"><i class="fa fa-microphone-slash fa-2x"
                                                           aria-hidden="true"></i><span>禁止发言</span></li>
            <li id="a4" @click="publicFunction('kick')"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i><span>踢出会议
            </span></li>
            <li id="a5" @click="meetingRecord('start')">
              <i class="fa fa-play-circle fa-2x" aria-hidden="true"></i>
              <span>会议录音</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="memberList">
        <div class="module">
          <ul class="nav nav-justified choose" data-name="title">
            <li class="on">全部</li>
            <li>分组</li>
          </ul>
          <div data-name="con">
            <div class="moduleList"  >
              <div class="singleM" v-for="item in group_users">
                <div class="moduleStyle"
                     :class="[item.registerState == 'registered' ? 'online' : 'offline' ]"
                     @click.stop="itemClick($event, item)">
                  <div class="moduleNum">{{ item.userExten }}</div>
                  <div class="moduleKind">视频终端</div>
                  <div class="moduleState" >{{ item.registerState == 'registered' ? '在线' : '离线' }}</div>
                </div>
              </div>
            </div>
            <div class="grouping">
              <div class="department">
                <ul data-name="title">
                  <li class="on">部门一</li>
                  <li>部门二</li>
                </ul>
              </div>
              <div class="rightDetailList" data-name="con">
                <div class="departDetail">
                  <div class="detailCon">
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">600</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">600</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">600</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                  </div>
                  <div class="selectAll">全部选择</div>
                </div>
                <div class="departDetail">
                  <div class="detailCon">
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">800</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">6001</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">600</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                    <div class="singleM">
                      <div class="moduleStyle online ">
                        <div class="moduleNum">600</div>
                        <div class="moduleKind">视频终端</div>
                        <div class="moduleState">在线</div>
                      </div>
                    </div>
                  </div>
                  <div class="selectAll">全部选择</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="functionMenu">
          <ul class="nav nav-justified menuList">
            <li id="a1" @click="startMeeting"><i class="fa fa-fire fa-2x" aria-hidden="true"></i><span>开始会议</span></li>
            <li id="a2"><i class="fa fa-user-plus fa-2x" aria-hidden="true"></i><span>加入成员</span></li>

          </ul>
        </div>
      </div>
    </div>
    <rightPhone></rightPhone>
    <confirm-dialog v-if="dialogShow">
      <slot name="content">确定要呼叫到</slot>
    </confirm-dialog>
  </div>
</template>

<script>
  import parseXML from 'utils/xml_parser';

  import {getHeight} from 'utils/height'
  import {getHeights,itemClick,isArray,isObject,isString} from 'utils/page/meeting'
  import { mapGetters,mapActions } from 'vuex'
  import {leftPhone,rightPhone,confirmDialog} from 'components'
  export default {

    data() {
      return {
        shows: false,
        deviceAll: [],
        group_users: {},
        currentLoginUser: {},
        users: [],
        vertoHandle: null,
        name: 3800+ '-'+window.location.hostname,
        nowSession: [],       // 正在开会的话机
        selectNowSession: [], // 会议中选中的话机
        selectPhone: []       // 选中待会议的话机
      }
    },
    computed: {
      ...mapGetters({
        dialogShow: 'dialogShow',
      }),
    },
    components: {
      leftPhone,
      rightPhone,
      confirmDialog
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()

        $.verto.init({}, this.bootstrap);

      })
    },
    methods: {
      bootstrap(status) {
        let $this = this
        this.vertoHandle = new jQuery.verto({
          login: 1008+'@'+ window.location.hostname,
          passwd: '1234',
          socketUrl: 'wss://'+ window.location.hostname +':8082',
          ringFile: 'sounds/bell_ring2.wav',
          tag: "webcam",
          videoParams: {
            "minWidth": "1280",
            "minHeight": "720",
            "minFrameRate": 30
          },
          iceServers: true,
          deviceParams: {
            useMic: true,
            useSpeak: true
          },
          audioParams: {
            googAutoGainControl: true,
            googNoiseSuppression: true,
            googHighpassFilter: true
          },

        }, {
          onWSLogin: function(verto, success) {
            $this.refresh()
            console.log('onWSLogin', success);
          },
          onWSClose: function(verto, success) {
            console.log('onWSClose', success);
          },
          onDialogState: function(d) {
            switch (d.state.name) {
              case "trying":
                break;
              case "answering":
                break;
              case "active":
                break;
              case "hangup":
                console.log("Call ended with cause: " + d.cause);
                break;
              case "destroy":
                // Some kind of client side cleanup...
                break;
            }
          }
        });
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

            this.group_users = group_users.ungrouped.users            // 分组数据
            this.users = users                                        // 所有数据
            this.currentLoginUser = currentLoginUser                  // 当前用户

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
        this.users = Object.assign([], this.users);
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

            if (users.length) _this.users = users

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
              debugger
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
      itemClick(e, row) {
        let target = e.currentTarget
        let _this = this

        if($(target).hasClass('online')) {
          if($(target).hasClass("onlineSelected") ){
            $(target).removeClass("onlineSelected")
            this.selectPhone.forEach(function(s,i) {
              if(s.userExten == row.userExten) {
                _this.selectPhone.splice(i, 1)
              }
            })
//            this.selectPhone.splice(this.selectPhone.indexOf(row.userExten));
          }else {
            $(target).addClass("onlineSelected");
            this.selectPhone.push(row)
          }


        }else if($(target).hasClass("calling")) {
          if($(target).hasClass("callingSelected")) {
            $(target).removeClass("callingSelected");
            this.selectNowSession.forEach(function(s,i) {
              if(s.userExten == row.userExten) {
                _this.selectNowSession.splice(i, 1)
              }
            })
          }else {
            $(target).addClass("callingSelected");
            this.selectNowSession.push(row)
          }
        }else if($(target).hasClass("waitting")) {
          if($(target).hasClass("waittingSelected")) {
            $(target).removeClass("waittingSelected");
          }else {
            $(target).addClass("waittingSelected");
          }
        }

      },
      //  开始会议
      startMeeting() {
        const laChannelName = this.getChannelName("liveArray");
        //  赋值到会议话机数组
        this.nowSession = Object.assign([], this.selectPhone);
        //  单个设备开始会议
        this.fsAPI("conference", this.name + " " + "dial" + " " + "user/"+this.selectPhone[0].userExten,function(res){
          console.log("邀请会议",res)
        });

        //  重置勾选话机数组
        this.selectPhone = []
        //  重置勾选样式
        let allPhone = $('.middleCon .memberList').eq(1).find('.moduleList').find('.moduleStyle')
        for(let i=0;i<allPhone.length;i++) {
          $(allPhone[i]).removeClass('onlineSelected')
          $(allPhone[i]).removeClass('callingSelected')
          $(allPhone[i]).removeClass('waittingSelected')
        }


        this.broadcast(laChannelName, {
          liveArray: {
            command: "bootstrap",
            context: laChannelName,
            name: this.name,
            obj: {}
          }
        });
      },
      broadcast(channel, params) {
        var msg = {
          eventChannel: channel,
          data: {}
        };

        for (var i in params) {
          msg.data[i] = params[i];
        }

        this.sendMethod("verto.broadcast", msg);
      },
      sendMethod(method, params, success_cb, error_cb) {
        const self = this;

        this.vertoHandle.rpcClient.call(method, params, function(e) {
          /* Success */
//          self.processReply(method, true, e);
          console.log("sendMethod success", e);
          if (success_cb) success_cb(e);
        }, function(e) {
          /* Error */
          console.log("sendMethod ERR", e);
          if (error_cb) error_cb(e);
//          self.processReply(method, false, e);
        });
      },
      getChannelName(what) { // liveArray chat mod
        return "conference-" + what + "." + this.name + "@" + window.location.hostname
      },
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.sendMethod("jsapi", {
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
      //  结束会议
      closeMeeting() {
        this.fsAPI("conference", this.name + " " + "hup all",function(res){
          console.log("会议结束 ",res)
          this.nowSession = []
          this.selectNowSession = []
        }.bind(this));
      },
      publicFunction(type) {
        if(this.selectNowSession.length != 0) {
          this.fsAPI("conference", "list",function(res){
            let msg = (res.message).split(";")[0]
            let index = msg.indexOf(')')
            let id = msg.slice(index+1)
            console.log("会议分配的id为: ", id)

            this.fsAPI("conference", this.name + " " + type +" " + id,function(res){
              switch (type){
                case "mute":
                  console.log("禁止发言成功：",res)
                  break;
                case "unmute":
                  console.log("允许发言成功：",res)
                  break;
                case "kick":
                  console.log("踢出会议成功：",res)
                  break;
              }
              this.removeChecked()
            }.bind(this))
          }.bind(this))
        }else {
          console.log("请勾选要执行的设备！")
        }
      },
      // 清除勾选的设备
      removeChecked() {
        this.nowSession.forEach(function(n, i){
          this.selectNowSession.map(function(s, c) {
            if(n.userExten == s.userExten) {
              this.nowSession.splice(i, 1)
            }
          }.bind(this))

        }.bind(this))
      },
      // 会议录音
      meetingRecord(type) {
        this.fsAPI("conference",this.name + " recording "+ type + " /tmp/record.wav", function(res){
          console.log("会议录音成功: ", res)
        })
      }
    },


  }
</script>

<style scoped>

</style>
