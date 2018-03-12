<template>
  <div class="content padding">

    <div class="broadcastCon">
      <div><!--tab01-->
        <div id="aa">
          <div class="tableTool">
            <button type="button" class="btn btn-success" @click="booking">发起预约</button>
            <div class="operate"
                 @click="deleteItem"><span class="delate"><i class="fa fa-times" aria-hidden="true"></i>删除</span></div>
          </div>
          <div class="table">
            <table class="table">
              <thead>
              <tr>
                <td>文件名称</td>
                <td>预约模式</td>
                <td>预约时间</td>
                <td>播放模式</td>
                <td>播放次数</td>
                <td>播放终端</td>
              </tr>
              </thead>
              <tbody>
              <tr @click="fileClick(0)">
                <td>fdafewr.mp3</td>
                <td>定时</td>
                <td>2017-11-05 13:00:00</td>
                <td>循环播放</td>
                <td>1</td>
                <td>701</td>
              </tr>
              <tr>
                <td>fdafewr.mp3</td>
                <td>定时</td>
                <td>2017-11-05 13:00:00</td>
                <td>循环播放</td>
                <td>1</td>
                <td>701</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



    </div>
    <confirm-dialog v-if="dialogShow">
      <p slot="content">确定要删除这个文件吗？</p>
    </confirm-dialog>
  </div>

</template>

<script>
  import edit from './edit.vue'
  import {getHeight} from 'utils/height'
  import {getHeights} from 'utils/page/broadOrder'
  import { confirmDialog } from 'components'
  import { mapGetters,mapActions } from 'vuex'
  export default {

    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
      })
    },
    computed: {
      ...mapGetters({
        dialogShow: 'dialogShow',
      }),
    },
    components: {
      edit,
      confirmDialog
    },
    methods: {
      fileClick(index) {
        $(".table>tbody>tr").eq(index).toggleClass("selected")
      },
      booking() {
        this.$store.dispatch('setDialogShow', true)

//        $('#ccc').show();
        $('#aa').hide();
      },
      deleteItem() {
        this.$store.dispatch('setDialogShow', true)

      }

    }
  }
</script>

<style scoped>

</style>
