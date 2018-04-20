<template>
  <div class="content padding">
    <div class="tableTool">
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" placeholder="" class="form-control select-width" style="width:200px;" />
          </div>
          <button type="submit" class="btn btn-info"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
          <button type="submit" class="btn btn-info" @click="openModal(0)"><i class="fa fa-search" aria-hidden="true"></i>新增</button>
        </form>
      </div>
    </div>
    <div class="table">
      <table class="table">
        <thead>
        <tr>
          <td>ID</td>
          <td>设备号</td>
          <td>设备名称</td>
          <td>设备类型</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>890-790-kkldalkkl</td>
          <td>1001</td>
          <td>隋岳1车道1号亭</td>
          <td>单话机</td>
          <td>
            <button type="submit" class="btn btn-sm btn-info">修改</button>
          </td>
        </tr>
        <tr>
          <td>890-790-kkldalkkl</td>
          <td><input type="text" value="1002" class="form-control select-width" style="width:200px;" /></td>
          <td><input type="text" value="隋岳1车道2号亭" class="form-control select-width" style="width:200px;" /></td>
          <td>视频终端</td>
          <td><button type="submit" class="btn btn-sm btn-info">确定</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dialogFormVisible">
      <modal :data="orgData" @close="close"></modal>
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
        deviceList:'deviceList'          // 所有设备
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
      }
    },
    components: {
      modal
    },
    methods: {
      openModal(id){
          debugger
          this.deviceList;
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

