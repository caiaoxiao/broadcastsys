<template>
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
        <div class="dial hangup">挂断</div>
      </div>
    </div>
  </div>

</template>

<script>
  import {getHeight} from 'utils/height'

  export default {
    data() {
      return {
        currentCall: null,
        vertoHandle: null,
        destination_number: ''
      }
    },
    created() {
      this.$nextTick(function () {
        getHeight()
//        $.verto.init({}, this.bootstrap);
      })
    },
    methods: {
      bootstrap(status) {
        let $this = this
        // 需要用到vuex里存储的用户信息
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
          onWSLogin: this.onWSLogin,
          onWSClose: this.onWSClose,
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
      onWSLogin(verto, success) {
        console.log('onWSLogin', success);
      },
      onWSClose(verto, success) {
        console.log('onWSClose', success);
      },
      clear() {
        this.destination_number = this.destination_number.substring(0, this.destination_number.length-1)
      },
      keypad(value) {
        this.destination_number = this.destination_number + value
      },
      callDivert() {
        this.$store.dispatch('CallDivert', {type: true, num: this.destination_number})
      },
      makeCall() {
        this.currentCall = this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: this.destination_number,
          caller_id_name: 'FreeSWITCH User',
          caller_id_number: '1008',
          useStereo: true,
        })
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
