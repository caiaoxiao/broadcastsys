<template>
<!--用户组管理-->
<div>
  <div class="content" >
    <div class="groupList">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>用户组列表
        <p @click="openModal(0)"><i class="fa fa-plus" aria-hidden="true"></i></p>
      </div>
      <form>
        <input type="text" class="form-control form-lighter" placeholder="快速查找组" />
      </form>
      <ul id="height01" class="devGroup">
        <li class="selected" v-for="(item , index) in groupLength">
          <p>{{item.departName}}</p>
          <ul>
            <li @click="openModal(item.OrganizationID)"><i class="fa fa-edit"></i></li>
            <li><i class="fa fa-times" ></i></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="singleDevice">
      <div class="tableTool">
        <div class="operate">
          <button type="submit" class="btn btn-info" @click="addshow(0)">
            <i class="fa fa-search" aria-hidden="true"></i>新增用户
          </button>
          <!--<button type="submit" class="btn btn-info">
            <i class="fa fa-search" aria-hidden="true"></i>批量删除
          </button>-->
        </div>
      </div>
      <div class="table">
        <table class="table">
          <thead>
          <tr>
            <td>用户名</td>
            <td>所属机构</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item , index) in departData">
            <td>{{item.UserName}}</td>
            <td >{{item.password}}</td>
            <td width="170">
              <button type="submit" class="btn btn-sm btn-info">移动到</button>
              <button type="submit" class="btn btn-sm btn-default" @click="deleteItems(self, 'Department/Remove', item.FeatureBaseID)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="dialogShow">
    <modal :data="orgData" @close="close"></modal>
  </div>
  <div v-if="dialog">
    <popUp :data="orgData" @close="close"></popUp>
  </div>
</div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import paging from "../paging/index.vue"
  import popUp from './edit.vue'
  import modal from './popUp.vue'
  export default {
    computed: {
      ...mapGetters({
        dialogFormVisible: 'dialogFormVisible',
        get_user_info: GET_USER_INFO,
        pageData:'pageData',
        updateState: 'updateState',
      })
    },
    data(){
      return {
        selectUser: [],
        departData:[],
        groupLength:[],
        userData:{
          OrganizationID:''
        },
        orgData: {
          pid:0,
          OrganizationID: this.$store.state.user_info.user.OrganizationID,
          orgId: '',
          DepartmentID:''
        },
        //请求时的loading效果
        loading: true,
        dialog:false,
        dialogShow:false,
        //批量选择数组
        batch_select: [],
        self: this,
      }
    },
    watch:{
      'pageData.pageSize':function () {
        this.refresh();
      },
      'pageData.pageIndex':function(){
        this.refresh();
      },
      'updateState': function() {
        if(this.updateState === 1) {
          this.refresh()
        }else if(this.updateState === 2) {
          this.refresh()
          this.$refs.tree.refresh(this.targetMenu)
        }
        this.$store.state.updateState = 0
      }
    },
    components: {
      popUp,
      modal,
      paging
    },
    created(){
      this.initSelectData()
      this.refresh()
    },
    methods: {
      openModal(id) {
        //  编辑或新增
        this.dialogShow =  !this.dialogShow

        if(id == 0) {
          this.orgData.orgId = 0
        }else if(id == 1){
          this.orgData.orgId = this.parentID
        }else {
          this.orgData.orgId = id
        }
      },
      addshow(){
        this.dialog =  !this.dialog
      },
      initSelectData() {
        this.$AjaxGet('Department/Detail/',this.orgData.OrganizationID, function(ret) {
          if(ret.code == 1) {
            let result = ret.result
            this.departData = result
            this.loading = false
          }
        }.bind(this))
      },
      //获取数据
      refresh(){
        var request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
          organizationID:this.orgData.OrganizationID
        };
        this.$AjaxGet("Department/List",request, function(ret) {
          if(ret.code == 1){
            let result = ret.result
            this.pageData.total=ret.total
            this.groupLength= result
            this.loading = false
          }
        }.bind(this));
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        var batchArr=[];
        for(var i=0;i<this.batch_select.length;i++){
          batchArr.push(this.batch_select[i].UserID);
        }
        var request = {
          Ids: batchArr,
          LoginId: this.get_user_info.user.UserID,
          OperatorObject: "人员信息"
        };
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.loading = true
            this.$AjaxPost('Role/RemoveList/',request, function(ret){
              if(ret.code == 1){
                this.refresh()
                this.$refs.tree.refresh(this.targetMenu);
                this.$message.success("删除成功！")
              }else{
                this.$message.success("删除失败！")
              }
            })
          })
      },
      close(){
        if(this.dialogFormVisible){
          this.$store.state.dialogFormVisible = false;
          this.$refs.tree.refresh(this.targetMenu);
          this.refresh();
        }
      },
      closeChange(){
        if(this.chanOrg){
          this.chanOrg=false;
          this.$refs.tree.refresh(this.targetMenu);
          this.refresh();
        }
      },

    }
  }
</script>
