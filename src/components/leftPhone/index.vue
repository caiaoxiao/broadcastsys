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
        inputValue: '',
        currentCall: null
      }
    },
    created() {
      this.$nextTick(function () {
        getHeight()
      })
    },
    methods: {
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
        this.currentCall = this.vertoHandle.newCall({
          // Extension to dial.
          destination_number: '3500',
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
