<template>
  <div>
    <div class="content padding">
      <ul class="nav nav-justified choose" data-name="title" >
        <li class="on">文件管理</li>
        <li>录音管理</li>
        <li>播放记录</li>
        <li>呼叫记录</li>
      </ul>
      <div data-name="con">
        <file-manage></file-manage>
        <record-manage></record-manage>
        <play-manage></play-manage>
        <call-manage></call-manage>
      </div>

    </div>

  </div>

</template>

<script>

  import {getHeight} from 'utils/height'
  import {getHeights} from 'utils/page/systemAdmin'
  import {fileManage, recordManage, callManage, playManage } from './index'
  export default {
    data() {
      return {
        tabName: '文件管理',
        tabMapOptions: [
          {name: '文件管理'},
          {name: '录音管理'},
          {name: '播放记录'},
          {name: '呼叫记录'}
        ]
      }
    },
    created() {
        this.$nextTick(function() {
          getHeight()
          getHeights()
        })
    },
    watch: {
      'tabName': function() {
          debugger
        getHeight()
        getHeights()
      }
    },
    components: {
      fileManage,
      recordManage,
      callManage,
      playManage
    },
    methods: {
      tabClick(e) {
        this.tabName = e.target.innerText
      }
    }
  }
</script>

<style scoped>

</style>
