<template>
  <div class="content padding">

    <div class="broadcastCon">
      <div><!--tab01-->
        <div id="aa">
          <div class="tableTool">
            <button type="button" class="btn btn-success" @click="booking">发起预约</button>
            <button type="button" class="btn btn-success" @click="orderDetail(detailData)">查看预约详情</button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              >
              <el-form ref="form" :model="detailData" label-width="80px">
                <el-form-item label="预案名称">
                  <el-input v-model="detailData.planname"></el-input>
                </el-form-item>
              </el-form> 
              <span slot="footer" class="dialog-footer">
                <el-button @click="diaReturn"><span style="color: #333;">取 消</span></el-button>
                <el-button type="primary" @click="diaConfirm">确 定</el-button>
              </span>
            </el-dialog>
            <div class="operate"
                 @click="deleteItem"><span class="delate"><i class="fa fa-times" aria-hidden="true"></i>删除</span></div>
          </div>
          <div class="table">
            <table class="table">
              <thead>
              <tr>
                <td>预案名称</td>
                <!-- <td>预约模式</td> -->
                <td>预约时间</td>
                <!-- <td>播放模式</td>
                <td>播放次数</td> -->
                <td>播放终端</td>
                <!-- <td>操作</td> -->
              </tr>
              </thead>
              <tbody v-if="showPlanData.length != 0">
              <tr @click="selectClick(index, plan)" v-for="(plan, index) in showPlanData">
                <td>{{ plan.planname }}</td>
                <!-- <td>{{ plan.planpremodel == 1 ? '定时预约' : ''}}</td> -->
                <td>{{ plan.planpretime }}</td>
                <!-- <td>{{ plan.planmodel == 1 ? '循环播放' : '按次播放' }}</td>
                <td>{{ plan.plantime }}</td> -->
                <td>{{broad}}</td>
                <!-- <td>
                  <span @click.stop="nowPlay">立即播放</span>
                </td> -->
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
  import {GET_USER_INFO} from 'store/getters/type'
  export default {
    data() {
      return {
        editShow: false,    //编辑框显示或隐藏
        selectPlan: [],
        verto: '',
	meeting: '',
	voice: '',
	alarm: '',
	broad: '',
        xPlanData: [],
        showPlanData: [],
        dialogVisible: false,
        detailData: '',     
      }
    },
    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
	$(".orgTreeList").removeClass("treeListShow").addClass("treeListHide")
        this.refresh()
	this.verto = this.get_user_info.freeswitchData.VertoID
	this.meeting = this.get_user_info.freeswitchData.MeetingID
	this.voice = this.get_user_info.freeswitchData.VoiceCallID
	this.alarm = this.get_user_info.freeswitchData.AlarmID
	this.broad = this.get_user_info.freeswitchData.BroadID
      })
    },
    computed: {
      ...mapGetters({
        dialogShow: 'dialogShow',
	get_user_info: GET_USER_INFO,
      }),
    },
    components: {
      edit,
      confirmDialog
    },
    methods: {
      refresh() {
        this.$ajax.post('Plan/List',{pageIndex:1,pageSize:1000})
          .then(res => {
            if(res.data.code == 1 && res.data.result!=null) {
              console.log("success");
              this.showPlanData = res.data.result
              console.log("The result is :",res.data.result); 
              this.showPlanData = this.showPlanData.reverse()
              console.log("The showPlanData is:",this.showPlanData)
              let i = 0;
              let j = 0;
              let sum = 1;
              let sum_show = 1;
              console.log("The length is:",res.data.result.length)
              for( i = 1; i<res.data.result.length;  i++) {
               console.log("",this.showPlanData[i].planname);  
               if (this.showPlanData[i].planname != this.showPlanData[i-1].planname) {
                  sum_show++;
                } 
              }
              console.log("The sum_show is:",sum_show)
              let sum_array = []
              sum_array.length = sum_show
              for( i = 0; i < sum_show; i++) {
                sum_array[i] = 1
              }
              // this.showPlanData.length = sum_show
              console.log("The sum_array's length is:",sum_array.length)
              for( i = 1, j = 0; i<res.data.result.length; i++) {
                if(res.data.result[i].planname == res.data.result[i-1].planname){
                  sum_array[j]++
                }else {
                  j++
                }
              }
              console.log("The sum_array is:",sum_array)
              console.log("THE SHOWPLANDATA IS:",this.showPlanData) 
              for( i = 0, j = 0; i<sum_array.length; i++, j=j+sum_array[i-1]) {
                this.showPlanData[i] = res.data.result[j]
                if(i+sum == res.data.result.length) {
                  this.showPlanData.splice(j+1,res.data.result.length-j-1)
                }
              }
              this.showPlanData.length = sum_show 
            }else {
              console.log("failed");
            }
          })
         
      },
      selectClick(index, plan) {
        let target = $(".table>tbody>tr").eq(index)
        if(target.hasClass('selected')) {
          this.detailData = '' 
          this.selectPlan.forEach(function(s, i) {
            if(s.planid == plan.planid) {
              this.selectPlan.splice(i, 1)
            }
          }.bind(this))
        }else {
          this.selectPlan.push(plan)
          this.detailData = plan 
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
      orderDetail(item) {
        console.log(item);
        this.dialogVisible = true
      },
      diaConfirm() {
        this.dialogVisible = false   
      },
      diaReturn() {
        this.dialogVisible = false   
      },
      deleteItem() {
        console.log(this.showPlanData[0].planname);
        if(this.selectPlan.length != 0) {
          this.$store.dispatch('setDialogShow', true)
        }
      },
      nowPlay() {
        
      },
      confirm(){
        let ids = []
        let idx = []
        let xxx = this.xPlanData
        this.selectPlan.forEach(function(s, i) {
          ids.push(s.planid)
          xxx.forEach(function(m, n) {
            if(s.planrpretime == m.time) idx.push(m.id)
          })
        })
        let _this = this
        idx.forEach(function(s, i) {
          console.log("qwer")
          _this.$ajax.get("https://scc.ieyeplus.com:8082/api/deletescheds/"+s)
            .then(res => { 
            })
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
