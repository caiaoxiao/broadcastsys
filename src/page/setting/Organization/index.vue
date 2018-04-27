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
      </div>
      <div class="table">
        <table class="table">
          <thead>
          <tr>
            <td>所属机构</td>
            <td>机构编码</td>
            <td>操作</td>
          </tr>
          </thead>
          <tbody v-if="dataAll.length != 0">
          <tr @click="selectClick(index, org)" v-for="(org, index) in dataAll">
            <td >{{ org.OrgName }}</td>
            <td >{{ org.OrgCode }}</td>
            <td width="170">
              <button type="submit" class="btn btn-sm btn-info" @click="openModal(org.OrganizationID)">修改</button>
              <button type="submit" class="btn btn-sm btn-default" @click="deleteItems(self, 'Organization/Remove', org.OrganizationID)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
        <!--<paging></paging>-->
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
  import {GET_USER_INFO} from 'store/getters/type'

  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData: 'pageData',
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
        dataAll: [],
        selectOrg: [],
        loading: true,
        //批量选择数组
        batch_select: [],
        orgData: {
          OrganizationID: '0',
          OrgName: '',
          orgId: '',
          LoginId:''
        },
        self: this,
        editObj:{},
        OrgUrl: '',
        targetMenu: {}
      }
    },
    components: {
      modal,
      tree
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
      //选中行
      selectClick(index, org) {
        let target = $(".table>tbody>tr").eq(index)
        if(target.hasClass('selected')) {
          this.selectOrg.forEach(function(s, i) {
            if(s.ChildNum == org.ChildNum) {
              this.selectOrg.splice(i, 1)
            }
          }.bind(this))
        }else {
          this.selectOrg.push(org)
        }
        this.selectOrg
        target.toggleClass("selected")

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
