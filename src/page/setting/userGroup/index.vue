<template>
  <div><!--用户组管理-->
    <div class="content" >
      <div class="groupList">
        <div class="menuType">
          <i class="fa fa-list-ul" aria-hidden="true"></i>用户组列表
          <p @click="addgroup()"><i class="fa fa-plus" aria-hidden="true"></i></p>
        </div>
        <form>
          <input type="text" class="form-control form-lighter" placeholder="快速查找组" />
        </form>
        <!--<tree :addr="OrgUrl" ref="tree" :lable="labels"    @initData="initDatas" ></tree>-->
      </div>
      <div class="singleDevice">
        <div class="tableTool">
          <div class="operate">
            <button type="submit" class="btn btn-info" @click="openModal(0)">
              <i class="fa fa-search" aria-hidden="true"></i>新增用户组
            </button>
            <button type="submit" class="btn btn-info">
              <i class="fa fa-search" aria-hidden="true"></i>批量删除
            </button>
          </div>
        </div>
        <div class="table">
          <el-table :data="dataAll">
            <el-table-column type="selection" :span="2" :selectable="selectToggle"></el-table-column>
            <el-table-column prop="SortIndex" label="序号" span="3"></el-table-column>
            <el-table-column prop="DepartName" label="部门名称" :span="3"></el-table-column>
            <el-table-column prop="OrgName" label="组织机构" :span="3"></el-table-column>
            <el-table-column label="操作" :span="3">
              <template>
                <el-button :plain="true" type="info"  size="small" icon="edit" @click="edit(props.row.DepartmentID)">移动到</el-button>
                <el-button :plain="true" type="danger"  size="small" icon="delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <modal :data="orgData" @close="close"></modal>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import modal from './edit.vue'
  import tree from '../structureTree/index.vue'

  export default{
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData:'pageData',
        batchSelectArr: 'batchSelectArr',
        dialogFormVisible: 'dialogFormVisible',
        btns:'btns',
        updateState: 'updateState',
        TreeData: 'TreeData'
      })
    },
    data(){
      return {
        labels:{
          treeName:"DepartName",
          defaultId: "DepartmentID",
        },
        btnGroupData: {
          batchApi: 'Department/RemoveList',
          keyID: 'DepartmentID'
        },
        self: this,
        dataAll: [],
        loading: true,
        orgData: {
          DepartmentID: '0',
          DepartName: '',
          orgId: '0',
          deptId:'0',
          orgName: ''
        },
        editObj:{},
        OrgUrl:'',
        deptTitle:'',
        targetMenu:{}
      }
    },
    components: {
      modal,
      tree
    },
    created(){
      this.orgData.DepartmentID=this.get_user_info.user.OrganizationID;
      //this.OrgUrl="Department/TreeRoot/"+this.get_user_info.user.OrganizationID;
      this.refresh()
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
      },
      'TreeData':  {
        handler:function(data){
          this.initParentID = null
          this.targetMenu = data
          this.orgData = data
          this.orgData.deptId = data.DepartmentID
          this.$nextTick(function () {
            this.refresh()
          })
        },
        deep:true
      }
    },
    methods: {
      ...mapActions([
        'batchSelect',
      ]),
      selectToggle(row){
        if(row.ChildNum==0){
          return true;
        }else{
          return false;
        }
      },
      edit(Id) {
          debugger
        this.$store.state.dialogFormVisible = true
        if(Id == 1) {
          if(this.initParentID) {
            this.orgData.deptId = this.initParentID
          }else {
            this.orgData.deptId = this.targetMenu.DepartmentID
          }
        }else {
          this.orgData.deptId = Id
        }

      },
      openModal(id){
          debugger;

        this.$store.state.dialogFormVisible = true
      },
      /*openModal(id) {
          debugger
        this.$store.state.dialogFormVisible = true
        if(id == 0) {
          this.orgData.orgId = 0
        }else if(id == 1){
          this.orgData.orgId = this.parentID
        }else {
          this.orgData.orgId = id
        }
      },*/
      close(){
        if(this.dialogFormVisible){
          this.$store.state.dialogFormVisible = false;
          this.$refs.tree.refresh(this.targetMenu);
          this.refresh();
        }
      },
      // 菜单初始化
      initDatas (data) {
        if(!this.targetMenu.hasOwnProperty("DepartmentID") && data) {
          this.initParentID = data.DepartmentID
          this.orgData = data
          this.editObj.DepartmentID=data.DepartmentID;
          this.refresh()
        }
      },
      //获取数据
      refresh(){
        let request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
          parentID : this.orgData.DepartmentID
        };
        this.$AjaxGet("Department/List",request, function (res) {
          if(res.code == 1){
            let result = res.result;
            this.pageData.total = res.total;
            this.dataAll = result;
            this.loading = false
          }
        }.bind(this));
      },
    }
  }
</script>
