<template>
  <div class="content padding">
    <div class="tableTool">
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" placeholder="" class="form-control select-width" v-model="searchName" style="width:200px;" />
          </div>
          <button type="submit" class="btn btn-info" @click="refresh"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
          <button type="submit" class="btn btn-info" @click="openModal(0)"><i class="fa fa-search" aria-hidden="true"></i>新增</button>
        </form>
      </div>
    </div>

    <div class="table">
      <table class="table">
        <thead>
        <tr>
          <td>设备号</td>
          <td>设备编号</td>
          <td>设备名称</td>
          <td>设备类型</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody v-if="dataAll.length != 0">
        <tr @click="selectClick(index, item)" v-for="(item, index) in dataAll">
          <td>{{item.FeatureBaseID}}</td>
          <td>{{item.FeatureCode}}</td>
          <td>{{item.FeatureName}}</td>
          <td>
            {{ item.FeatureType == 0 ? '单话机' : '视频话机' }}
          </td>
          <td>
            <button type="submit" class="btn btn-sm btn-info" @click="openModal(item.OrganizationID)">修改</button>
            <button type="submit" class="btn btn-sm btn-default" @click="deleteItems(self, 'Feature/Remove', item.FeatureBaseID)">删除</button>
          </td>
        </tr>
        <!--<tr>
          <td>890-790-kkldalkkl</td>
          <td><input type="text" value="1002" class="form-control select-width" style="width:200px;" /></td>
          <td><input type="text" value="隋岳1车道2号亭" class="form-control select-width" style="width:200px;" /></td>
          <td><button type="submit" class="btn btn-sm btn-info">确定</button></td>
        </tr>-->
        </tbody>
      </table>
    </div>
    <div v-if="dialogFormVisible">
      <modal :data="formData"></modal>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import modal from './edit.vue'
  import {GET_USER_INFO} from 'store/getters/type'
  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
        pageData: 'pageData',
        deviceList:'deviceList'          // 所有设备
      })
    },
    data(){
      return {
        labels: {
          defaultId: "OrganizationID",
        },
        dataAll: [],
        selectPlan: [],
        //请求时的loading效果
        loading: true,
        self: this,
        searchName: '',
        formData: {
          pid: 0,
          FeatureBaseID:''
        },
        FeatureType:[{'0':'单话机'},{'1':'视频话机'}]
      }
    },
    watch: {
      'pageData.pageSize': function () {
        this.refresh()
      },
      'pageData.pageIndex': function () {
        this.refresh()
      }
    },
    components: {
      modal
    },
    created() {
      this.refresh();
    },
    methods: {
      //获取数据
      refresh(){
        var request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
        }
        this.$AjaxPost("Feature/List",request, function(ret) {
          if(ret.code == 1){
            let result = ret.result
            this.pageData.total=ret.total
            this.dataAll = result
            for(let i in this.dataAll) {
              this.formData.FeatureBaseID = this.dataAll[i].FeatureBaseID
            }
            this.loading = false
          }
        }.bind(this));
      },
      openModal(id) {
        //  编辑或新增
        this.$store.state.dialogFormVisible = true
        if(id == 0) {
          this.formData.pid = 0
        }else if(id == 1){
          this.formData.pid = this.parentID
        }else {
          this.formData.pid = id
        }
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
    }
  }
</script>

