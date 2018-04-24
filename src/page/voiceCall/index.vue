<script src="../../utils/page/meeting.js"></script>
<template>
  <div >
   <div class="phone left">
      <div class="phoneTitle"><i class="fa fa-user-circle" aria-hidden="true"></i>左话机</div>
         <div class="numList"> 
            <div>
                 <ul class="callNum">
                        <li v-for="item in callQueue" @click="answerCall(item)">
                             <i v-if="item.state == 'ringing'" class="fa fa-circle orange" aria-hidden="true"></i>
                              <i v-if="item.state == 'hangup'" class="fa fa-clock-o" aria-hidden="true"></i> {{ item.num }}
                         </li>
                 </ul>
            </div>
          </div>
     <div>
         <video width="800" id="video-container" autoplay="autoplay" hidden="true"></video>
     </div>
     <div class="phoneDial">
       <div class="numDisplay">
        <span>{{destination_number}}</span>
        <img @click="clear" src="../../assets/img/delate.fw.png" />
       </div>
       <div class="dialDisplay">
           <div @click="keypad('1')" class="dial">1</div>       
           <div @click="keypad('2')" class="dial">2</div>       
           <div @click="keypad('3')" class="dial">3</div>
           <div @click="keypad('4')" class="dial">4</div>
           <div @click="keypad('5')" class="dial">5</div>
           <div @click="keypad('6')" class="dial">6</div>   
           <div @click="keypad('7')" class="dial">7</div>
           <div @click="keypad('8')" class="dial">8</div>
           <div @click="keypad('9')" class="dial">9</div> 
           <div @click="keypad('*')" class="dial">*</div>
           <div @click="keypad('0')" class="dial">0</div>
           <div @click="keypad('#')" class="dial">#</div>
       </div>
       <div class="dialAction">
          <div class="dial" @click="callDivert">呼叫转移</div>
          <div class="dial ring" @click="call"><i class="fa fa-phone fa-2x" aria-hidden="true"></i></div> 
          <div class="dial hangup" @click="hangupCall">挂断</div>
       </div> 
     </div>
    </div>

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
          <div class="moduleList" id="height01">
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
                      <div class="moduleNum">800</div>
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
          <li id="a1" @click="call"><i class="fa fa-phone fa-2x" aria-hidden="true"></i><span>呼叫</span></li>
          <li id="a2" @click="strongCall"><i class="fa fa-volume-control-phone fa-2x" aria-hidden="true"></i><span>强行通话</span></li>
          <li id="a3" @click="strongDelete"><i class="fa fa-window-close fa-2x" aria-hidden="true" onclick="$('#eeee').show();"></i><span>强拆</span></li>
          <li id="a4" @click="strongJoin"><i class="fa fa-deaf fa-2x" aria-hidden="true"></i><span>强插</span></li>
          <li id="a5" @click="observe"><i class="fa fa-headphones fa-2x" aria-hidden="true"></i><span>监听</span></li>
          <li id="a6" @click="daiJie"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i><span>代接</span></li>
          <li id="a7" @click="callTraverse"><i class="fa fa-reply fa-2x" aria-hidden="true" onclick="$('#noNum').show();"></i><span>转到</span></li>
          <li id="a8" @click="startRecording"><i class="fa fa-play fa-2x" aria-hidden="true"></i><span>录音</span></li>

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
    components: {
      leftPhone,
      rightPhone,
      deviceList,
      switchs
    },
    data() {
      return {
        inputValue: '',
        deviceAll: [],
        currentCall: null,
        destination_number: '',
        nowCall: [],
        selectNowCall: [],
        selectPhone: [], 
        num : 0 
       }
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
      'callqueue': function() {
   
     }
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
         }else if($(target).hasClass("waiting")) {
           if($(target).hasClass("waittingSelected")) {
             $(target).removeClass("waittingSelected");
           }else {
             $(target).addClass("waittingSelected");
           }
         }
         this.destination_number = this.selectPhone[0].userID;
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

     // 对指定话机进行的通话录音
      startRecording() {
        this.fsAPI("uuid_record",this.selectNowCall[0].channelUUID + " " + "start" +" " +"/tmp/record"+this.num+".wav",function(res) {console.log("start record")}.bind(this)); 
        this.selectNowCall = []; 
        this.num++;
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
         let users = this.deviceList
         let userChanged = false
         let select = this.selectNowCall[0]

         users.forEach(function(user) {
           if (user.userID == select.userID) {
            user.operationState = 2
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

     // 实现管理员对指定通话的强插
       strongJoin() {
         this.fsAPI("originate","user/"+"9000"+" "+"&three_way("+this.selectNowCall[0].channelUUID+")",function(res) {console.log("qiang join")}.bind(this));
         this.selectNowCall = [];
      },

     // 实现管理员对指定通话的监听
       observe() {
         this.fsAPI("originate","user/"+"9000"+" "+"&eavesdrop("+this.selectNowCall[0].channelUUID+")",function(res) {console.log("observe")}.bind(this));
         console.log(this.currentLoginUser); 
         this.selectPhone = [];
         this.selectNowCall = [];
      }, 

     // 实现第三方对于指定通话中一方的代接
       daiJie() {
         this.fsAPI("uuid_transfer",this.selectNowCall[0].channelUUID+" "+"sip:"+this.selectPhone[0].userID+"@"+this.selectPhone[0].networkIP+":"+this.selectPhone[0].networkPort,function(res) {console.log("daijie")}.bind(this));
         this.selectPhone = [];
         this.selectNowCall = [];
      },

     // 实现呼叫转移
       callTraverse() {
         this.fsAPI("uuid_deflect",this.selectNowCall[0].channelUUID+" "+"sip:"+this.selectPhone[0].userID+"@"+this.selectPhone[0].networkIP+":"+this.selectPhone[0].networkPort,function(res) {console.log("call traverse")}.bind(this));
         this.selectPhone = [];
         this.selectNowCall = [];
      }, 

      clear() {
           this.destination_number = this.destination_number.substring(0, this.destination_number.length-1)
      },
      keypad(value) {
           this.destination_number = this.destination_number + value
      },
      answerCall(item) {
           this.callQueue[0].curCall.answer();
      },
      callDivert() {
           this.$store.dispatch('CallDivert', {type: true, num: this.destination_number})
      },
      // call 
      call() {
       this.vertoHandle.newCall({         
        destination_number : this.destination_number,
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
