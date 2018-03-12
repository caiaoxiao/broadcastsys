<template>
  <div >
    <div class="phone left">
      <div class="phoneTitle"><i class="fa fa-user-circle" aria-hidden="true"></i>左话机</div>
      <div class="numList">
        <div>
          <ul class="callNum">
            <li><i class="fa fa-circle red" aria-hidden="true"></i>1005<span>00:00:01</span></li>
            <li><i class="fa fa-circle orange" aria-hidden="true"></i>1005</li>
            <li><i class="fa fa-clock-o" aria-hidden="true"></i>1005</li>
          </ul>
        </div>
      </div>
      <div class="phoneDial">
        <div class="numDisplay">
          <span >{{inputValue}}</span>
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
          <div class="dial ring" @click="makeCall"><i class="fa fa-phone fa-2x" aria-hidden="true"></i></div>
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
            <div class="singleM">
              <div class="moduleStyle online " @click.stop="itemClick">
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
                <div class="moduleNum">700</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">在线</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling " @click.stop="itemClick">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端

                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle calling01">
                <div class="moduleNum">600<span>800</span></div>
                <div class="moduleKind">
                  视频终端
                  <span><img src="../../assets/img/record.gif" /></span>
                </div>
                <div class="moduleState">00:00:01<span class="fa fa-phone" aria-hidden="true"></span></div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle waitting" @click.stop="itemClick">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">振铃中</div>
              </div>
            </div>
            <div class="singleM">
              <div class="moduleStyle offline">
                <div class="moduleNum">600</div>
                <div class="moduleKind">视频终端</div>
                <div class="moduleState">离线</div>
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
          <li id="a2"><i class="fa fa-volume-control-phone fa-2x" aria-hidden="true"></i><span>强行通话</span></li>
          <li id="a3"><i class="fa fa-window-close fa-2x" aria-hidden="true" onclick="$('#eeee').show();"></i><span>强拆</span></li>
          <li id="a4"><i class="fa fa-deaf fa-2x" aria-hidden="true"></i><span>强插</span></li>
          <li id="a5"><i class="fa fa-headphones fa-2x" aria-hidden="true"></i><span>监听</span></li>
          <li id="a6"><i class="fa fa-phone-square fa-2x" aria-hidden="true"></i><span>代接</span></li>
          <li id="a7"><i class="fa fa-reply fa-2x" aria-hidden="true" onclick="$('#noNum').show();"></i><span>转到</span></li>
          <li id="a8"><i class="fa fa-play fa-2x" aria-hidden="true"></i><span>录音</span></li>

        </ul>
      </div>
    </div>
    <right-phone></right-phone>
    <device-list></device-list>
    <switchs></switchs>
  </div>
</template>

<script>
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
        currentCall: null
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()

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
      call() {


      },
      play() {
        $('.playMenu').removeClass('Hide').addClass('Show');
      },
      hangupCall() {
          console.log("挂断");
        this.currentCall.hangup();
      },
      // copy leftPhone
      clear() {
        this.inputValue = this.inputValue.substring(0, this.inputValue.length-1)
      },
      keypad(value) {
        this.inputValue = this.inputValue + value
      },
      callDivert() {
        this.$store.dispatch('CallDivert', {type: true, num: this.inputValue})
      },
      makeCall() {
          debugger;
        this.currentCall = this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: '3500',
          caller_id_name: 'FreeSWITCH User',
          caller_id_number: '1008',
          outgoingBandwidth: 'default',
          incomingBandwidth: 'default',
          useStereo: true,
          useMic: true,
          useSpeak: true,
          dedEnc: false,
        })
      }
    }
  }
</script>

<style scoped>


</style>
