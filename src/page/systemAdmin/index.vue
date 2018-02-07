<template>
  <div>
    <div class="content padding">
      <ul class="nav nav-justified choose" >
        <li @click="toggle($index, tab.view)" v-for="(tab, $index) in tabs" :class="{on: active == $index}">{{ tab.name}}</li>
      </ul>
      <div>
        <components :is="currentView"></components>
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
        currentView: 'fileManage',
        active: 0,
        tabs: [
          {name: '文件管理',view: 'fileManage'},
          {name: '录音管理',view: 'recordManage'},
          {name: '播放记录',view: 'playManage'},
          {name: '呼叫记录',view: 'callManage'}
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
      'currentView': function() {
        this.$nextTick(function() {
          getHeight()
          getHeights()
        })
      }
    },
    components: {
      fileManage,
      recordManage,
      callManage,
      playManage
    },
    methods: {
      toggle(i, v) {
        this.active = i
        this.currentView = v
      },
      tabClick(e) {
        this.tabName = e.target.innerText
      }
    }
  }
</script>

<style scoped>

</style>
