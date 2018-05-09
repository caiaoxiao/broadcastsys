<template>
  <div class="content">
    <div class="groupList">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>组织机构
      </div>
      <tree :addr="OrgUrl" ref="tree" :lable="labels" @setInitData="initDatas"></tree>
    </div>
    <div class="singleDevice">
      <div class="tableTool">
        <div class="operate">
          <button type="submit" class="btn btn-sm btn-info" @click="openModal(0)">
            新增用户
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
          <tbody>
            <tr v-for="data in dataAll" :key='data.organizationID'>
              <td>{{ data.userName }}</td>
              <td>{{ data.roleName }}</td>
              <td>{{ data.orgName }}</td>
              <td width="170">
                <button type="button" class="btn btn-sm btn-info" @click="openModal(data.userID)">修改</button>
                <button type="button" class="btn btn-sm btn-default" @click="deleteItem(data.userID)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!--<paging></paging>-->
      </div>
      <div v-if="modolType != null">
        <modal :targetMenu="targetMenu" :modolType='modolType' @close="closeModal"></modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import tree from '../structureTree/index.vue'
import paging from '../paging/index.vue'
import modal from './modal.vue'
import { GET_USER_INFO } from 'store/getters/type'
const labels = {
  defaultId: 'OrganizationID',
  treeName: 'OrgName'
}
export default {
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO,
      updateState: 'updateState',
      TreeData: 'TreeData'
    })
  },
  data () {
    return {
      labels,
      selectUser: [],
      dataAll: [],
      targetMenu: {},
      self: this,
      modolType: null
    }
  },
  watch: {
    'TreeData': {
      handler: function (data) {
        this.targetMenu = data
        this.$nextTick(function () {
          this.refresh()
        })
      },
      deep: true
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
  },
  components: {
    tree,
    modal,
    paging
  },
  created () {
    this.OrgUrl = 'Organization/TreeRoot/' + this.$store.state.user_info.user.organizationID
  },
  methods: {  //  组织机构树默认选中
    initDatas (data) {
      if (!this.targetMenu.hasOwnProperty('OrganizationID') && data) {
        this.targetMenu = data
        this.refresh()
      }
    },
    // 渲染表格数据
    refresh () {
      let request = {
        organizationID: this.targetMenu.OrganizationID
      }
      this.$ajax.post('User/List', request)
        .then((res) => {
          if (res.data.code === 1) {
            this.dataAll = res.data.result
          }
        })
    },
    openModal (id) {
      // 编辑或新增
      if (id === 0) {
        this.modolType = 0
      } else {
        this.modolType = 1
        this.targetMenu.userId = id
      }
    },
    closeModal () {
      this.modolType = null
    },
    deleteItem (userId) {
      this.$ajax.delete(`User/Remove/${userId}`)
        .then(res => {
          if (res.data.code === 1) {
            console.log('删除成功')
            this.refresh()
          }
        })
    }
  }
}
</script>

