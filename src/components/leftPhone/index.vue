<template>
  <div class="phone left">
    <div class="phoneTitle">
      <div class="onair">
        <div class="cloud onair"></div>
      </div>语音
      <div class="phoneMeeting meetingOut">
        <i aria-hidden="true" class="fa fa-plus"></i>退出</div>
    </div>
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
            <i v-if="item.state == 'ringing' || item.state=='requesting' || item.state=='active'" class="fa fa-circle orange" aria-hidden="true"></i>
            <!--i v-if="item.state == 'hangup'" class="fa fa-clock-o" aria-hidden="true"></i-->
            {{item.caller}}
          </li>
          <!--<li><i class="fa fa-clock-o" aria-hidden="true"></i>1005</li>-->
        </ul>
      </div>
    </div>
    <div>
      <video width="800" id="video-container" autoplay="autoplay" hidden="true"></video>

    </div>
    <div class="phoneDial">
      <div class="dial rightdial" v-for="(item,index) in btnData" @mousedown="$btnMousedown" @mouseup="$btnMouseup">
        <i aria-hidden="true" class="fa" :class="item.class"></i>
        <span>{{item.name}}</span>
      </div>


    </div>
  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  const btnData = [
    { name: '邀请成员', class: 'fa-user-plus' },
    { name: '允许通话', class: 'fa-microphone' },
    { name: '排队等待', class: 'fa-spinner' },
    { name: '踢出会话', class: 'fa-sign-out' },
    { name: '会话录音', class: 'fa-play-circle' },
    { name: '结束服务', class: 'fa-window-close-o' },
    { name: '用户转出', class: 'fa-user-times' },
    { name: '确认转出', class: 'fa-reply-all' },
    { name: '取消转出', class: 'fa-remove' },
  ]
  export default {
    data() {
      return {
        btnData
      }
    },
    created() {
      this.$nextTick(function () {
        // getHeight()
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
      'callQueue': function () {

      }
    },
    methods: {
      clear() {
        this.destination_number = this.destination_number.substring(0, this.destination_number.length - 1)
      },
      keypad(value) {
        this.destination_number = this.destination_number + value
      },
      answerCall(item) {
        this.callQueue[0].curCall.answer();
      },
      callDivert() {
        // 呼叫转移
        if (this.destination_number != '') {
          this.$store.dispatch('CallDivert', { type: true, num: this.destination_number })
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
