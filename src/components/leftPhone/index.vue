<template>
  <div class="phone left">
    <div class="phoneTitle"><i class="fa fa-user-circle" aria-hidden="true"></i>左话机</div>
    <div class="numList">
      <div>
        <ul class="callNum">
          <!--<li v-for="item in callQueue">-->
            <!--<i  class="fa fa-circle red" aria-hidden="true"></i>-->
            <!--1005-->
            <!--<span>00:00:01</span>-->
          <!--</li>-->
          <li v-for="item in callQueue" @click="answerCall(item)">
            <!--<i  class="fa fa-circle red" aria-hidden="true"></i>-->
            <i v-if="item.state == 'ringing'" class="fa fa-circle orange" aria-hidden="true"></i>
            <i v-if="item.state == 'hangup'" class="fa fa-clock-o" aria-hidden="true"></i>
            {{item.num}}
          </li>
          <!--<li><i class="fa fa-clock-o" aria-hidden="true"></i>1005</li>-->
        </ul>
      </div>
    </div>
    <div>
      <video width="800" id="video-container" autoplay="autoplay" hidden="true"></video>

    </div>
    <div class="phoneDial">
      <div class="numDisplay">
        <span >{{destination_number}}</span>
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

</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  import {getHeight} from 'utils/height'

  export default {
    data() {
      return {
        destination_number: ''
      }
    },
    created() {
      this.$nextTick(function () {
        getHeight()
//        $.verto.init({}, this.bootstrap);
      })
    },
    computed: {
      ...mapGetters({
        vertoHandle: 'vertoHandle',
        group_users: 'group_users',
        users: 'users',
        currentLoginUser: 'currentLoginUser',
        callQueue: 'callQueue'
      }),
    },
    watch: {
      'callQueue': function() {

      }
    },
    methods: {
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
        // 呼叫转移
        if(this.destination_number != '') {
          this.$store.dispatch('CallDivert', {type: true, num: this.destination_number})
        }
      },
      makeCall() {
        this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: this.destination_number,
          caller_id_name: 'LegalHigh',
          caller_id_number: '9000',
          outgoingBandwidth: 'default',
          incomingBandwidth: 'default',
          useStereo: true,
          dedEnc: false,
          tag: "video-container",
          deviceParams: {
            useMic: "any",
            useSpeak: "any",
            useCamera: "any"
          }
        })
      },
      hangupCall() {
        this.vertoHandle.hangup();
      }

    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
