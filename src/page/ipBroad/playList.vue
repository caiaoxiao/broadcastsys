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
          <div class="songSheet" v-for="songlist in playList"  @click="(()=> songlist.unfold = !songlist.unfold)">
            <div class="songSheetName songSheetNameSelect">
              <div class="songSetting">
                <span class="toggle"><i class="fa fa-angle-right" aria-hidden="true"></i></span>
                <p >{{songlist.FolderName}}</p>
                <span class="musicNum">[{{ songlist.Files ? songlist.Files.length :0}}]</span>
              </div>
              <span class="songSheetTool">选择</span>
            </div>
            <ul class="musicList" v-if="songlist.unfold">
              <li v-for="fileItem in songlist.Files">
                <p>{{ fileItem.FileName }}</p>
                <ul class="musicListTools">
                  <li><i class="fa fa-play-circle" aria-hidden="true"></i>试听</li>

                </ul>
                <span class="totalTime" v-if="fileItem.MediaType == 1"> {{ fileItem.FileTime}}</span>
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
      <button type="button" class="btn btn-info" @click="play">OK,播放！</button>
      <button type="button" class="btn btn-default" @click="close">取消</button>
    </div>
  </div>

</template>

<script>
  import {getHeight} from 'utils/height'
  import {getHeights} from 'utils/page/ipBroad'

  export default {
    props: ['selectPhone'],
    data() {
      return {
        tabType: '播放列表',
        playList: []
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
        this.refresh()
      })
    },
    methods: {
      refresh() {
        // 1、查询歌单数组
        this.$ajax.get('Folder/getTreeFiles', {params: {UserID: '133585596bb04c9cbe311d0859dd7196'}})
          .then(res => {
            if(res.data.code == 1) {
              let result = res.data.result
              result.forEach(function(r,i){
                r.unfold = false
              })
              this.playList = result
            }
          })
      },
      tabClick(e) {
        this.tabType = e.target.innerText
      },
      play() {
        this.selectPhone
      },
      close() {
        this.$emit('closeDialog')
      }
    }
  }
</script>

<style type="text/scss" rel="stylesheet/scss" lang="scss">

</style>
