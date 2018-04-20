<template>
  <div>
    <div class="content" >
      <tree :addr="OrgUrl" ref="tree" :lable="labels" @initData="initDatas"></tree>
      <div class="singleDevice">
        <div class="tableTool">
          <div class="operate">
            <button type="submit" class="btn btn-sm btn-info" @click="openModal(0)">
              <i class="fa fa-search" aria-hidden="true"></i>新增用户
            </button>
            <button type="submit" class="btn btn-sm btn-info" :disabled="batch_select.length === 0" @click="on_batch_del">
              <i class="fa fa-search" aria-hidden="true"></i>批量删除
            </button>
          </div>
        </div>
        <div class="table">
          <el-table :data="dataAll" element-loading-text="拼命加载中" border @selection-change="on_batch_select">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="UserName" label="用户名"></el-table-column>
            <el-table-column prop="RoleName" label="角色"></el-table-column>
            <el-table-column prop="OrgName" label="所属机构"></el-table-column>
            <el-table-column prop="DepartName" label="所属部门"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="info" :plain="true" size="small" icon="edit">修改</el-button>
                <el-button type="danger" :plain="true" size="small" icon="delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--<paging></paging>-->
      </div>
      <div v-if="dialogFormVisible">
        <modal :data="orgData" @close="close"></modal>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import tree from "../structureTree/index.vue"
  import paging from "../paging/index.vue"
  import modal from './edit.vue'
  import {GET_USER_INFO} from 'store/getters/type'
  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData:'pageData',
        btns:'btns',
        batchSelectArr: 'batchSelectArr',
        dialogFormVisible: 'dialogFormVisible',
        updateState: 'updateState',
        TreeData: 'TreeData'
      })
    },
    data(){
      return {
        labels: {
          defaultId: "OrganizationID",
          treeName: "OrgName"
        },
        dataAll: null,
        //请求时的loading效果
        loading: true,
        //批量选择数组
        batch_select: [],
        orgData: {
          OrganizationID: this.$store.state.user_info.user.OrganizationID,
          OrgName: '',
          orgId: '',
          userId: '0',
          userName: '',
          userAccount: '',
        },
        departlist:[],
        rolelist:[],
        OrgUrl: 'Organization/TreeRoot/'+this.$store.state.user_info.user.OrganizationID,
        chanOrg:false,
        changeTitle:'',
        targetMenu:{},
        roleId:'',
        deptId:'',
        self: this,
      }
    },
    watch:{
      'deptId':function () {
        this.refresh();
      },
      'roleId':function () {
        this.refresh();
      },
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
      },
      'TreeData':  {
        handler:function(data){
          this.initParentID = null
          this.targetMenu = data
          this.orgData = data
          this.orgData.OrganizationID = data.OrganizationID
          this.$nextTick(function () {
            this.refresh()
          })
        },
        deep:true
      }
    },
    components: {
      tree,
      modal,
      paging
    },
    created(){
      this.initSelectData()
      this.refresh()
    },
    methods: {
      openModal(id){
        this.orgData.userId=id;
        this.$store.state.dialogFormVisible = true
      },
      changeOrg(Id){
        this.orgData.userId=Id;
        this.changeTitle='分配';
        this.chanOrg=true;
      },
      initSelectData() {
        var request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex
        }
        this.departlist = []
        this.rolelist = []
        this.$AjaxPost('Department/List',request, function(ret) {
          if(ret.code == 1) {
            this.departlist = ret.result
            /*this.departlist.unshift({
              DepartName: "请选择部门",
              DepartmentID: ''
            })*/

          }
        }.bind(this))
        this.$AjaxPost('Role/List',request, function(ret) {
          if(ret.code == 1) {
            this.rolelist = ret.result;
            this.rolelist.unshift({
              RoleName: "请选择角色",
              RoleID: ''
            })
          }
        }.bind(this));
      },
      initDatas (data) {
        if(!this.targetMenu.hasOwnProperty("OrganizationID") && data) {
          this.orgData = data
          this.orgData.OrganizationID = data.OrganizationID;
          this.refresh()
        }
      },
      //获取数据
      refresh(){
        var request = {
          userName: this.orgData.userName,
          userPhone: this.orgData.userAccount,
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
          departmentID: this.deptId,
          roleID: this.roleId,
          organizationID:this.orgData.OrganizationID
        };
        this.$AjaxPost("User/List",request, function(ret) {
          if(ret.code == 1){
            let result = ret.result
            this.pageData.total=ret.total
            this.dataAll= result
            this.loading = false
          }
        }.bind(this));
      },
      resetPWD(userId){
        this.$confirm('是否重置密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let request = {
              userID: userId,
              LoginId:this.get_user_info.user.UserID,
              OperatorObject: "密码重置",
            };
            this.$AjaxPost('User/EditPwd', request, function (ret) {
              if(ret.code == 1){
                this.refresh()
                this.$message.success("修改成功！")
              }else{
                this.$message.success("修改失败！")
              }
            }.bind(this))
          })
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
            this.$AjaxPost('User/RemoveList/',request, function(ret){
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

