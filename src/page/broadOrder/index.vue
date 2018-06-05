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
                <td>预案名称</td>
                <td>预约模式</td>
                <td>预约时间</td>
                <td>播放模式</td>
                <td>播放次数</td>
                <td>播放终端</td>
                <td>操作</td>
              </tr>
              </thead>
              <tbody v-if="planData.length != 0">
              <tr @click="selectClick(index, plan)" v-for="(plan, index) in planData">
                <td>{{ plan.PlanName }}</td>
                <td>{{ plan.PlanPreModel == 1 ? '定时预约' : ''}}</td>
                <td>{{ plan.PlanPreTime }}</td>
                <td>{{ plan.PlanModel == 1 ? '循环播放' : '按次播放' }}</td>
                <td>{{ plan.PlanTime }}</td>
                <td>701</td>
                <td>
                  <span @click.stop="nowPlay">立即播放</span>
                </td>
              </tr>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>



    </div>
    <edit v-if="editShow" @close="booking"></edit>
    <confirm-dialog v-if="dialogShow" @submit="confirm">
      <p slot="content">确定要删除这些预案吗？</p>
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
    data() {
      return {
        editShow: false,    //编辑框显示或隐藏
        selectPlan: [],
        planData: []
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
        this.refresh()
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
      refresh() {
        console.log("000000000000");
        this.$ajax.post('Plan/List', {params: {PlanName: '333'}})
          .then(res => {
            if(res.data.code == 1) {
              console.log("success");
              this.planData = res.data.result
            }else {
              console.log("failed");
            }
          })
      },
      selectClick(index, plan) {
        let target = $(".table>tbody>tr").eq(index)
        if(target.hasClass('selected')) {
          this.selectPlan.forEach(function(s, i) {
            if(s.PlanID == plan.PlanID) {
              this.selectPlan.splice(i, 1)
            }
          }.bind(this))
        }else {
          this.selectPlan.push(plan)
        }
        this.selectPlan
        target.toggleClass("selected")

      },
      booking(type) {
        this.editShow =  !this.editShow
        $('#aa').toggle()
        if(type == 1) {
          this.refresh()

        }
      },
      deleteItem() {
        if(this.selectPlan.length != 0) {
          this.$store.dispatch('setDialogShow', true)
        }
      },
      nowPlay() {

      },
      confirm(){
        let ids = []
        this.selectPlan.forEach(function(s, i) {
          ids.push(s.PlanID)
        })
        this.$ajax.post('Plan/RemoveList', ids)
          .then(res => {
            if(res.data.code == 1) {
              this.$store.dispatch('setDialogShow', false)
              this.refresh()
            }else {

            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
