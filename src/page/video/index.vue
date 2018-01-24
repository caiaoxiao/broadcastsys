<template>
  <div>
    <div class="leftList">
      <div class="orgTitle">成员列表[视频终端]</div>
      <ul class="orgList">
        <li><i class="fa fa-user" aria-hidden="true"></i>1001</li>
        <li><i class="fa fa-user" aria-hidden="true"></i>1001</li>
        <li><i class="fa fa-user" aria-hidden="true"></i>1001</li>
      </ul>
      <div class="screen" >
        <span class="one">一分屏</span>
        <span class="four active">四分屏</span>
        <span class="nine">九分屏</span>
      </div>
    </div>
    <div class="videoRight">
      <div class="screenDisplay ">

        <div class="screen-4 singleScreen" v-for="n in num" @click.self.prevent="videoClick">
          <div class="tip">提示信息</div>
          <ul class="screenTools" >
            <li><i class="fa fa-times red" aria-hidden="true" @click="off"></i>断开</li>
            <li><i class="fa fa-play green" aria-hidden="true" @click="gmod"></i>录像</li>
            <li><i class="fa fa-share orange" aria-hidden="true" @click="transpond"></i>转发</li>
            <li><i class="fa fa-video-camera blue" aria-hidden="true" @click="video"></i>视频</li>
            <li><i class="fa fa-microphone-slash red" aria-hidden="true" @click="mute"></i>静音</li>
            <li><i class="fa fa-arrows-alt" aria-hidden="true" @click="fullScreen"></i>全屏</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {getHeight} from 'utils/height'
  export default{
    data() {
      return {
        num: 4
      }
    },
    created() {
      this.$nextTick(function () {
        getHeight()
      })
    },
    methods: {
      videoClick(e) {
        $(e.target).toggleClass("screenSelected")
      },
      off() {       // 断开

      },
      gmod() {      // 录像

      },
      transpond() { // 转发

      },
      video() {     // 视频

      },
      mute() {      // 静音

      },
      fullScreen() {// 全屏

      }
    }
  }
</script>

<style scoped>

</style>
