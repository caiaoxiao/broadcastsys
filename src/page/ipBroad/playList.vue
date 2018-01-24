<template>
  <div class="module playMenu" id="music">
    <ul class="nav nav-justified broadcast" data-name="title">
      <li class="on">播放列表</li>
      <li >实时文本</li>
    </ul>
    <div class="con" data-name="con">
      <div class="selection"  >
        <div class="menuType"><i class="fa fa-outdent" aria-hidden="true"></i>播放列表</div>
        <div id="songListHeight">
          <div class="songSheet">
            <div class="songSheetName songSheetNameSelect">
              <div class="songSetting">
                <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                <p contenteditable="false">歌单名称</p>
                <span class="musicNum">[10]</span>
              </div>
              <span class="songSheetTool">选择</span>
            </div>
            <ul class="musicList">
              <li>
                <p>洗刷刷.mp3</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
              <li>
                <p>噢噢噢噢.text</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
              <li>
                <p>xixix.wma</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
            </ul>
          </div>
          <div class="songSheet">
            <div class="songSheetName">
              <div class="songSetting">
                <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                <p contenteditable="false">歌单名称</p>
                <span class="musicNum">[10]</span>

              </div>
              <span class="songSheetTool"><i class="fa fa-plus" aria-hidden="true"></i></span>
            </div>
            <ul class="musicList">
              <li>
                <p>洗刷刷.mp3</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
              <li>
                <p>噢噢噢噢.text</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
              <li>
                <p>xixix.wma</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>
                  <li><i class="fa fa-plus" aria-hidden="true"></i>添加</li>
                </ul>
                <span class="totalTime">05:12</span>
              </li>
            </ul>
          </div>
        </div>


      </div>
      <div class="textFlies"   >
        <textarea class="form-control" rows="7"></textarea>
      </div>
    </div>

    <div class="btnDiv">
      <button type="button" class="btn btn-info" @click="close">OK,播放！</button>
      <button type="button" class="btn btn-default" @click="close">取消</button>
    </div>
  </div>

</template>

<script>
  import {getHeight} from 'utils/height'

  export default {
    data() {
      return {
        tabType: '播放列表'
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
      })
    },
    methods: {
      tabClick(e) {
        this.tabType = e.target.innerText
      },
      close() {
        $('.playMenu').removeClass('Show').addClass('Hide')
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
