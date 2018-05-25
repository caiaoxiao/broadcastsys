<script src="../../utils/page/meeting.js"></script>
<template>
  <div >
     <left-phone  :select-phone="selectPhone" ></left-phone>
    <div id="media">
      <video width=800 id="webcam" autoplay="autoplay" hidden="true"></video>
    </div>
    <div class="middleCon">
      <div class="module">
        <ul class="nav nav-justified choose" data-name="title">
          <li class="on">全部</li>
          <li @click="refresh(userGroup[0])">分组</li>
        </ul>
        <div data-name="con">
          <div class="moduleList " id="height01">
            <div class="singleM" v-for="item in deviceList">
              <div class="moduleStyle" :class="returnClass(item.deviceState)" @click.stop="itemClick($event, item)">
                <div class="moduleNum">{{ item.userID }}
                  <span v-if="item.calleeNumber || item.callerNumber">
                    {{item.calleeNumber ? item.calleeNumber : item.callerNumber}}
                  </span>
                </div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">{{ returnState(item.deviceState)  + ((item.timer.s>0 || item.timer.m>0 || item.timer.h>0)?" 持续"+item.timer.m+"m" +Math.floor(item.timer.s)+"s":"")}}</div>
              </div>
            </div>
          </div>
          <div class="moduleList">
            <div class="department">
              <ul data-name="title">
                <li
                @click="refresh(item)"
                :class="{on: item.selected}"
                 v-for='item in userGroup'>{{ item.name }}</li>
              </ul>
            </div>
            <div class="rightDetailList" data-name="con">
              <div class="departDetail">
                <div class="detailCon">
                  <div class="singleM" v-show="returnGroup(item)" v-for="item in deviceList">
                    <div 
                      class = "moduleStyle"
                      :class="returnClass(item.deviceState)" 
                      @click.stop="itemClick($event, item)" >
                      <div class="moduleNum">{{ item.userID }}</div>
                      <div class="moduleKind">{{item.type == 1 ? "话机设备" : "视频设备" }}</div>
		      <div class="moduleState">{{ returnState(item.deviceState)  + ((item.timer.s>0 || item.timer.m>0 || item.timer.h>0)?" 持续"+item.timer.m+"m" +Math.floor(item.timer.s)+"s":"")}}</div>
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
          <li id="a1" @click="call" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-phone fa-2x" aria-hidden="true"></i>
            <span>呼叫</span>
          </li>
          <li id="a2" @click="strongCall" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-volume-control-phone fa-2x" aria-hidden="true"></i>
            <span>强行通话</span>
          </li>
          <li id="a3" @click="strongDelete" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-window-close fa-2x" aria-hidden="true" onclick="$('#eeee').show();"></i>
            <span>强拆</span>
          </li>
          <li id="a4" @click="strongJoin" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-deaf fa-2x" aria-hidden="true"></i>
            <span>强插</span>
          </li>
          <li id="a5" @click="observe" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-headphones fa-2x" aria-hidden="true"></i>
            <span>监听</span>
          </li>
          <li id="a6" @click="daiJie" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-phone-square fa-2x" aria-hidden="true"></i>
            <span>代接</span>
          </li>
          <li id="a7" @click="callTraverse" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
            <i class="fa fa-reply fa-2x" aria-hidden="true" onclick="$('#noNum').show();"></i>
            <span>转到</span>
          </li>
        </ul>
      </div>
    </div>
    <right-phone></right-phone>
    <device-list></device-list>
    <switchs></switchs>
  </div>
</template>

<script>
import parseXML from 'utils/xml_parser';
import { mapGetters, mapActions } from 'vuex'
import { getHeight } from 'utils/height'
import { getHeights, itemClick } from 'utils/page/voiceCall'
import { leftPhone, rightPhone, deviceList, switchs } from 'components'

export default {
  components: {
    leftPhone,
    rightPhone,
    deviceList,
    switchs
  },
  data () {
    return {
      inputValue: '',
      deviceAll: [],
      currentCall: null,
      destination_number: '',
      nowCall: [],
      selectNowCall: [],
      selectPhone: [],
      selectRingCall: [],
      deviceGroupList: [],
      deviceGroup: [],
      num: 0,
      groupShow:"",
    }
  },
  created () {
    this.$nextTick(function () {
      getHeight()
      getHeights()
      //this.initData()
    })
  },
  computed: {
    ...mapGetters([
      'dialogShow',
      'callQueue',
      'vertoHandle',
      'group_users',
      'users',
      'deviceList',
      'currentLoginUser',
      'userGroup',
      'timer'
    ])
  },
  watch: {
    'timer': function (timer) {
	}
  },
  methods: {
    // 获取设备分组数据
    returnGroup(item){
      return item.groupid.some((it)=>{return it==this.groupShow})
    },
    returnClass(status){
      switch(status){
        case "registered":
          return "online"
          break
        case "unregistered":
          return "offline"
          break
        case "ringing":
          return "waitting"
          break
        case "active":
          return "calling01"
          break
        case "register":
          return "online"
          break
      }
    },
    returnState(status){
      switch(status){
        case "registered":
          return "在线"
          break
        case "unregistered":
          return "离线"
          break
        case "ringing":
          return "振铃"
          break
        case "active":
            return "通话中"
            break
	case "register":
          return "在线"
          break
      }
    },
    refresh (item) {
      this.userGroup.forEach((r, i) => {
              r.selected = false
            })
      item.selected = true
      this.groupShow = item.deviceGroupId
    },
    itemClick (e, row) {
      let target = e.currentTarget
      let _this = this

      if ($(target).hasClass('online')) {
        if ($(target).hasClass("onlineSelected")) {
          $(target).removeClass("onlineSelected")
          this.selectPhone.forEach(function (s, i) {
            if (s.userID == row.userID) {
              _this.selectPhone.splice(i, 1)
            }
          })
        } else {
          $(target).addClass("onlineSelected");
          this.selectPhone.push(row)
        }
      } else if ($(target).hasClass("calling")) {
        if ($(target).hasClass("callingSelected")) {
          $(target).removeClass("callingSelected");
          this.selectNowCall.forEach(function (s, i) {
            if (s.userID == row.userID) {
              _this.selectNowCall.splice(i, 1)
            }
          })
        } else {
          $(target).addClass("callingSelected");
          this.selectNowCall.push(row)
        }
      } else if ($(target).hasClass("waitting")) {
        if ($(target).hasClass("waittingSelected")) {
          $(target).removeClass("waittingSelected");
          this.selectRingCall.forEach(function (s, i) {
            if (s.userID == row.userID) {
              _this.selectRingCall.splice(i, 1)
            }
          })
        } else {
          $(target).addClass("waittingSelected");
          this.selectRingCall.push(row)
        }
      }
      this.destination_number =this.selectPhone.length>0?this.selectPhone[0].userID:'';

    },
    fsAPI (cmd, arg, success_cb, failed_cb) {
      this.vertoHandle.sendMethod("jsapi", {
        command: "fsapi",
        data: {
          cmd: cmd,
          arg: arg
        },
      }, success_cb, failed_cb);
    },



    // 实现管理员和指定话机的强行通话
    strongCall () {
      let users = this.deviceList
      let userChanged = false
      let select = this.selectNowCall[0]
  

      users.forEach(function (user) {
        if (user.userID == select.userID) {
          user.operationState = 1
          userChanged = true
        }
      }
      )

      if (userChanged) this.$store.dispatch('setDeviceList', users)

      this.vertoHandle.newCall({
        destination_number: '9001',
        caller_id_name: '9000',
        caller_id_number: '9000',
        outgoingBandwidth: 'default',
        incomingBandwidth: 'default',
        useStereo: true,
        dedEnc: false,
        tag: "video-container",
        deviceParams: {
          useMic: "any",
          useSpeak: "any",
          useCamera: "any",
        }
      })

      this.selectNowCall = [];
    },


     // 实现管理员对指定通话的强拆
       strongDelete() {
         this.fsAPI("uuid_kill",this.selectNowCall[0].channelUUID,function(res) {console.log("qiang delete")}.bind(this));
         this.selectNowCall = [];
      },

    // 实现管理员对指定通话的强插
    strongJoin () {
      let select = this.selectNowCall[0];
      this.vertoHandle.newCall({
        destination_number: '9003' + select.channelUUID,
        caller_id_name: '9000',
        caller_id_number: '9000',
        outgoingBandwidth: 'default',
        incomingBandwidth: 'default',
        useStereo: true,
        dedEnc: false,
        tag: "video-container",
        deviceParams: {
          useMic: "any",
          useSpeak: "any",
          useCamera: "any",
        }
      })
      this.selectNowCall = [];
    },

    // 实现管理员对指定通话的监听
    observe () {

      let select = this.selectNowCall[0];
      console.log(this.selectNowCall[0].channelUUID);
      this.vertoHandle.newCall({
        destination_number: '9002' + select.channelUUID,
        caller_id_name: '9000',
        caller_id_number: '9000',
        outgoingBandwidth: 'default',
        incomingBandwidth: 'default',
        useStereo: true,
        dedEnc: false,
        tag: "video-container",
        deviceParams: {
          useMic: "any",
          useSpeak: "any",
          useCamera: "any",
        }
      })

      this.selectNowCall = [];
    },

    // 实现第三方对于指定通话中一方的代接
    daiJie () {

      let users = this.deviceList;
      let userChanged = false;
      let select = this.selectRingCall[0];

      this.vertoHandle.newCall({
        destination_number: '9004' + this.selectRingCall[0].oppoChannelUUID,
        caller_id_name: '9000',
        caller_id_number: '9000',
        outgoingBandwidth: 'default',
        incomingBandwidth: 'default',
        useStereo: true,
        dedEnc: false,
        tag: "video-container",
        deviceParams: {
          useMic: "any",
          useSpeak: "any",
          useCamera: "any",
        }
      })
      console.log(select.userID);
      this.selectRingCall = [];
    },

     // 实现呼叫转移
       callTraverse() {
         console.log(this.selectNowCall[0].channelUUID);
         console.log(this.selectPhone[0].userID);
         console.log(this.selectPhone[0].networkIP);
         console.log(this.selectPhone[0].networkPort);
         console.log(this.selectPhone[0]);
         console.log(this.deviceList[0]);
         console.log("1234567890");
         this.fsAPI("uuid_transfer",this.selectNowCall[0].channelUUID+" "+"sip:"+this.selectPhone[0].userID+"@"+this.selectPhone[0].networkIP+":"+this.selectPhone[0].networkPort,function(res) {console.log("call traverse")}.bind(this));
         this.selectPhone = [];
         this.selectNowCall = [];
      },

      // call
      call() {
       this.vertoHandle.newCall({
        destination_number : this.selectPhone[0].userID,
        caller_id_name: '9000',
        caller_id_number: '9000',
        outgoingBandwidth: 'default',
        incomingBandwidth: 'default',
        useStereo: true,
        dedEnc: false,
        tag: "video-container",
        deviceParams: {
          useMic: "any",
          useSpeak: "any",
          useCamera: "any",
        }
      })
      this.selectPhone = [];
    },

    hangupCall () {
      this.vertoHandle.hangup();
    },
    play () {
      $('.playMenu').removeClass('Hide').addClass('Show');
    }
  }
}
</script>

<style scoped>

</style>
