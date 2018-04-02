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
              <div class="singleM" v-for="item in deviceList">
                <div class="moduleStyle"
                     :class="[item.deviceState == 'registered' ? 'online' : 'offline' ]"
                     @click.stop="itemClick($event, item)">
                  <div class="moduleNum">{{ item.userID }}</div>
                  <div class="moduleKind">视频终端</div>
                  <div class="moduleState" >{{ item.deviceState == 'registered' ? '在线' : '离线' }}</div>
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
        name: 3800+ '-' + window.location.hostname,
        nowSession: [],       // 正在开会的话机
        selectNowSession: [], // 会议中选中的话机
        selectPhone: []       // 选中待会议的话机
      }
    },
    computed: {
      ...mapGetters([
        'dialogShow',
        'vertoHandle',           // verto初始化
        'deviceList',           // 分组设备(不包括当前用户)
      ]),
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

      })
    },
    methods: {

      itemClick(e, row) {
        let target = e.currentTarget
        let _this = this

        if($(target).hasClass('online')) {
          if($(target).hasClass("onlineSelected") ){
            $(target).removeClass("onlineSelected")
            this.selectPhone.forEach(function(s,i) {
              if(s.userID == row.userID) {
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
              if(s.userID == row.userID) {
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
        debugger
        if(this.selectPhone.length != 0) {
          //  赋值到会议话机数组
          this.nowSession = Object.assign([], this.selectPhone);
          //  单个设备开始会议
          this.selectPhone.forEach(function(s, i){
            this.fsAPI("conference",
              this.name + " " + "bgdial" + " " + "user/"+this.selectPhone[i].userID,function(res){
              console.log("邀请会议",res)
            });
          }.bind(this))

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
        }
      },
      broadcast(channel, params) {
        var msg = {
          eventChannel: channel,
          data: {}
        };

        for (var i in params) {
          msg.data[i] = params[i];
        }

        this.vertoHandle.sendMethod("verto.broadcast", msg);
      },

      getChannelName(what) { // liveArray chat mod
        return "conference-" + what + "." + this.name + "@" + window.location.hostname
      },
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi", {
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
      //  结束会议
      closeMeeting() {
        if(this.selectNowSession.length != 0) {
          this.fsAPI("conference", this.name + " " + "hup all", function (res) {
            console.log("会议结束 ", res)
            this.nowSession = []
            this.selectNowSession = []
          }.bind(this));
        }
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
      test() {

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
