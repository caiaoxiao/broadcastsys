<template>
  <div class="content">
    <tree :addr="OrgUrl" ref="tree" :data="labels" @initData="initDatas"></tree>
    <div class="singleDevice">
      <div class="tableTool">
        <div class="operate">
          <button type="primary" class="btn btn-sm btn-info"  @click="openModal(0)">
            <i class="fa fa-search" aria-hidden="true"></i>新增用户
          </button>
          <button type="danger" class="btn btn-sm btn-info" :disabled="batch_select.length === 0">
            <i class="fa fa-search" aria-hidden="true"></i>批量删除
          </button>
        </div>
        <!--<buttongroup @edits="openModal()" :btnGroupData="btnGroupData" :btns="btns" :batchSelectArr="batchSelectArr"></buttongroup>-->
      </div>
      <div class="table">
        <el-table :data="dataAll" element-loading-text="拼命加载中" style="background-color: #4E545A">

          <el-table-column type="selection" :span="2" :selectable="selectToggle" ></el-table-column>
          <el-table-column prop="SortIndex" label="序号" :span="3"></el-table-column>
          <el-table-column prop="OrgName" label="所属机构" :span="3"></el-table-column>
          <el-table-column prop="OrgCode" label="机构编码" :span="3"></el-table-column>
          <el-table-column prop="ChildNum" label="所属部门" :span="3"></el-table-column>
          <el-table-column label="操作" :span="3">
            <template>
              <el-button :plain="true" type="info" size="small" icon="edit" @click="openModal(props.row.OrganizationID)">编辑</el-button>
              <el-button :plain="true" type="danger" size="small" icon="delete" @click="deleteItems(self, 'Organization/Remove', props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="dialogFormVisible">
        <modal :data="orgData"></modal>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters,mapActions} from 'vuex'
  import tree from "../structureTree/index.vue"
  import modal from "./edit"
  import buttongroup from "../buttonGroup/index"
  import {GET_USER_INFO} from 'store/getters/type'

  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData: 'pageData',
        btns: 'btns',
        batchSelectArr: 'batchSelectArr',
        dialogFormVisible: 'dialogFormVisible',
        updateState: 'updateState',
        TreeData: 'TreeData'
      })
    },
    data(){
      return {
        btnGroupData: {
          batchApi: 'Organization/RemoveList',
          keyID: 'OrganizationID',
        },
        labels: {
          defaultId: "OrganizationID",
          treeName: "OrgName"
        },
        dataAll: null,
        loading: true,
        //批量选择数组
        batch_select: [],
        orgData: {
          OrganizationID: '0',
          OrgName: '',
          orgId: ''
        },
        self: this,
        editObj:{},
        OrgUrl: '',
        targetMenu: {}
      }
    },
    components: {
      modal,
      tree,
      buttongroup
    },
    created(){
      this.orgData.OrganizationID = this.get_user_info.user.OrganizationID;
      this.OrgUrl = "Organization/TreeRoot/"+this.get_user_info.user.OrganizationID;
      this.refresh()
    },
    watch: {
      'pageData.pageSize': function () {
        this.refresh();
      },
      'pageData.pageIndex': function () {
        this.refresh();
      },
      'updateState': function () {
        if (this.updateState === 1) {
          this.refresh()
        } else if (this.updateState === 2) {
          this.refresh()
          this.$refs.tree.refresh(this.targetMenu)
        }
        this.$store.state.updateState = 0
      },
      'TreeData': {
        handler: function (data) {
          this.parentID = data.OrganizationID
          this.targetMenu = data
          this.orgData = data
          this.$nextTick(function () {
            this.refresh()
          })
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'batchSelect'
      ]),
      openModal(id) {
        this.$store.state.dialogFormVisible = true
        if(id == 0) {
          this.orgData.orgId = 0
        }else if(id == 1){
          this.orgData.orgId = this.parentID
        }else {
          this.orgData.orgId = id
        }
      },
      close(){
        if(this.dialogFormVisible){
          this.$store.state.dialogFormVisible = false;
          this.$refs.tree.refresh(this.targetMenu);
          this.refresh();
        }
      },
      selectToggle(row) {
        if (row.ChildNum == 0) {
          return true;
        } else {
          return false;
        }
      },
      // 组织机构初始化
      initDatas (data) {
          debugger
        if (!this.targetMenu.hasOwnProperty("OrganizationID") && data) {
          this.parentID = data.OrganizationID
          this.orgData = data
          this.orgData.OrgName = data.OrgName;
          this.editObj.OrganizationID = data.OrganizationID;
          this.refresh()
        }
      },
      //获取数据
      refresh(){
        let request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
          parentID: this.parentID,
          orgName: this.orgName,
          orgCode: this.orgCode
        };
        this.$AjaxPost('Organization/List', request,
          function (res) {
            if (res.code == 1) {
              var result = res.result;
              this.pageData.total = res.total;
              this.dataAll = result;
              this.loading = false
            }

          }.bind(this))
      },
    }
  }
</script>
