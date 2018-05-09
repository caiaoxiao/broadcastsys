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
          <li>分组</li>
        </ul>
        <div data-name="con">
          <div class="moduleList " id="height01">
            <div class="singleM "><!--video-camera：视频终端，phone：语音终端，left:被叫 right：主叫-->
              <div class="moduleStyle  calling01 "><!--通话中-->
                <div class="moduleNum"><i class="fa fa-video-camera" aria-hidden="true"></i>8001<i class="fa fa-arrow-left"></i><p>襄十分中心哎哟哎哟3车道</p></div>
                <div class="moduleNum"><i class="fa fa-phone" aria-hidden="true"></i>7001<i class="fa fa-arrow-right"></i><p>襄十分中心哎哟哎哟3车道</p> </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM ">
              <div class="moduleStyle online"><!--在线-->
                <div class="moduleNum"><i class="fa fa-video-camera" aria-hidden="true"></i>8001</div>
                <div class="moduleNum">襄十分中心哎哟哎哟3车道 </div>
              </div>
            </div>
            <div class="singleM ">
              <div class="moduleStyle waitting"><!--振铃中-->
                <div class="moduleNum"><i class="fa fa-video-camera" aria-hidden="true"></i>8001<i class="fa fa-arrow-left"></i><p>襄十分中心哎哟哎哟3车道</p></div>
                <div class="moduleNum"><i class="fa fa-phone" aria-hidden="true"></i>7001<i class="fa fa-arrow-right"></i><p>襄十分中心哎哟哎哟3车道</p> </div>
              </div>
            </div>
            <div class="singleM ">
              <div class="moduleStyle offline"><!--离线-->
                <div class="moduleNum"><i class="fa fa-phone" aria-hidden="true"></i>8001</div>
                <div class="moduleNum">襄十分中心哎哟哎哟3车道 </div>
              </div>
            </div>
            <div class="singleM" v-for="item in deviceList">
              <div class="moduleStyle"
                   :class="returnClass(item.deviceState)"
                   @click.stop="itemClick($event, item)">
                <div class="moduleNum">{{  item.userID }}
                  <span v-if="item.calleeNumber || item.callerNumber">
                     {{item.calleeNumber ? item.calleeNumber : item.callerNumber}}
                  </span>
                </div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">{{ returnState(item.deviceState) }}</div>
              </div>
            </div>


          </div>
          <div class="moduleList">
            <div class="department">
              <ul data-name="title">
                <li class ="on">部门一</li>
                <li >部门二</li>
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
                      <div class="moduleNum">900</div>
                      <div class="moduleKind">视频终端</div>
                      <div class="moduleState">在线</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum">1600</div>
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
                      <div class="moduleNum">1000</div>
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
                      <div class="moduleNum"><i class="fa fa-file-video-o" aria-hidden="true"></i>800[主叫]</div>
                      <div class="moduleKind">襄十分中心哎哟哎哟3车道</div>
                      <div class="moduleNum"><i class="fa fa-file-video-o" aria-hidden="true"></i>800[主叫]</div>
                      <div class="moduleKind">襄十分中心哎哟哎哟3车道</div>
                    </div>
                  </div>
                  <div class="singleM">
                    <div class="moduleStyle online ">
                      <div class="moduleNum"><i class="fa fa-phone-square" aria-hidden="true"></i> 600</div>
                      <div class="moduleKind">襄十分中心3车道</div>
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
          <li id="a1" @click="call"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-phone fa-2x" aria-hidden="true"></i><span>呼叫</span></li>
          <li id="a2" @click="strongCall"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-volume-control-phone fa-2x" aria-hidden="true"></i><span>强行通话</span></li>
          <li id="a3" @click="strongDelete"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-window-close fa-2x" aria-hidden="true" onclick="$('#eeee').show();"></i><span>强拆</span></li>
          <li id="a4" @click="strongJoin"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-deaf fa-2x" aria-hidden="true"></i><span>强插</span></li>
          <li id="a5" @click="observe"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-headphones fa-2x" aria-hidden="true"></i><span>监听</span></li>
          <li id="a6" @click="daiJie"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i><span>代接</span></li>
          <li id="a7" @click="callTraverse"  @mousedown="$btnMousedown" @mouseup="$btnMouseup"><i class="fa fa-reply fa-2x" aria-hidden="true" onclick="$('#noNum').show();"></i><span>转到</span></li>

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
  import { mapGetters,mapActions } from 'vuex'
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/voiceCall'
  import { leftPhone, rightPhone, deviceList, switchs} from 'components'



  export default {
    data() {
      return {
        inputValue: '',
        deviceAll: [],
        currentCall: null,
        nowCall: [],
        selectNowCall: [],
        selectPhone: [],
        selectRingCall: [],
       }
    },
    components: {
      leftPhone,
      rightPhone,
      deviceList,
      switchs
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()

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
        'currentLoginUser'
      ]),
    },
    watch: {
    },
    methods: {
      itemClick(e, row) {
        let target = e.currentTarget
        let _this = this
        if($(target).hasClass('online')) {
          if($(target).hasClass("onlineSelected")) {
            $(target).removeClass("onlineSelected")
            this.selectPhone.forEach(function(s,i) {
               if(s.userID == row.userID) {
                 _this.selectPhone.splice(i, 1)
               }
            })
          }else {
            $(target).addClass("onlineSelected");
            this.selectPhone.push(row)
          }
         }else if ($(target).hasClass("calling")) {
           if($(target).hasClass("callingSelected")) {
             $(target).removeClass("callingSelected");
             this.selectNowCall.forEach(function(s,i) {
               if(s.userID == row.userID) {
                 _this.selectNowCall.splice(i, 1)
               }
             })
           }else {
             $(target).addClass("callingSelected");
             this.selectNowCall.push(row)
           }
         }else if($(target).hasClass("waitting")) {
           if($(target).hasClass("waittingSelected")) {
             $(target).removeClass("waittingSelected");
             this.selectRingCall.forEach(function(s,i) {
               if(s.userID == row.userID) {
                 _this.selectRingCall.splice(i,1)
               }
             })
           }else {
             $(target).addClass("waittingSelected");
             this.selectRingCall.push(row)
           }
         }
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

     // 实现管理员和指定话机的强行通话
       strongCall() {
         let users = this.deviceList
         let userChanged = false
         let select = this.selectNowCall[0]

         users.forEach(function(user) {
           if(user.userID == select.userID) {
              user.operationState = 1
              userChanged = true
           }
          }
         )

         if(userChanged) this.$store.dispatch('setDeviceList',users)

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
       strongJoin() {
         let select = this.selectNowCall[0];
         this.vertoHandle.newCall({
           destination_number: '9003'+select.channelUUID,
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
       observe() {

         let select = this.selectNowCall[0];
         console.log(this.selectNowCall[0].channelUUID);
         this.vertoHandle.newCall({
           destination_number: '9002'+select.channelUUID,
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
       daiJie() {

         let users = this.deviceList;
         let userChanged = false;
         let select = this.selectRingCall[0];

         this.vertoHandle.newCall({
          destination_number: '9004'+this.selectRingCall[0].oppoChannelUUID,
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

      hangupCall(){
        this.vertoHandle.hangup();
      },
      play() {
        $('.playMenu').removeClass('Hide').addClass('Show');
      }
    }
  }
</script>

<style scoped>


</style>
