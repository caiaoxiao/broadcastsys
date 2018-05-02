<template>
    <div class="content" >
      <div class="groupList">
        <div class="menuType">
          <i class="fa fa-list-ul" aria-hidden="true"></i>组织机构
        </div>
        <tree :addr="OrgUrl" ref="tree" :lable="labels" @initData="initDatas"></tree>
      </div>
      <div class="singleDevice">
        <div class="tableTool">
          <div class="operate">
            <button type="submit" class="btn btn-sm btn-info" @click="openModal(0)">
              <i class="fa fa-search" aria-hidden="true"></i>新增用户
            </button>
            <!--<button type="submit" class="btn btn-sm btn-info" :disabled="batch_select.length === 0" @click="on_batch_del">
              <i class="fa fa-search" aria-hidden="true"></i>批量删除
            </button>-->
          </div>
        </div>
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <td>用户名</td>
                <td>所属用户组</td>
                <td>所属机构</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody >
              <tr @click="selectClick(index, user)" v-for="(user, index) in userData">
                <td >{{ user.UserName }}</td>
                <td >{{ user.DepartName }}</td>
                <td >{{ user.OrgName }}</td>
                <td width="170">
                  <button type="submit" class="btn btn-sm btn-info" @click="openModal(user.OrganizationID)">修改</button>
                  <button type="submit" class="btn btn-sm btn-default" @click="deleteItems(self, 'User/Remove', user.UserID)">删除</button>
                </td>
              </tr>
            </tbody>
          </table>
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
        selectUser: [],
        userData:{
          OrganizationID:''
        },
        //请求时的loading效果
        loading: true,
        //批量选择数组
        batch_select: [],
        orgData: {
          pid:0,
          OrganizationID: this.$store.state.user_info.user.OrganizationID,
          orgId: '',
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
      openModal(id) {
        //  编辑或新增
        this.$store.state.dialogFormVisible = true
        if(id == 0) {
          this.orgData.orgId = 0
        }else if(id == 1){
          this.orgData.orgId = this.parentID
        }else {
          this.orgData.orgId = id
        }
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
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
          organizationID:this.orgData.OrganizationID
        };
        this.$AjaxPost("User/List",request, function(ret) {
          if(ret.code == 1){
            debugger
            let result = ret.result
            this.pageData.total=ret.total
            this.userData= result
            this.loading = false
          }
        }.bind(this));
      },
      //选中行
      selectClick(index, user) {
        let target = $(".table>tbody>tr").eq(index)
        if(target.hasClass('selected')) {
          this.selectUser.forEach(function(s, i) {
            if(s.roleID == user.roleID) {
              this.selectUser.splice(i, 1)
            }
          }.bind(this))
        }else {
          this.selectUser.push(user)
        }
        this.selectUser
        target.toggleClass("selected")

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

