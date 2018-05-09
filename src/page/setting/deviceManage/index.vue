<template>
  <div class="content padding">
    <div class="tableTool">
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" placeholder="请输入要查询的设备编号" class="form-control select-width" style="width:200px;" v-model="fuzzyquery" />
          </div>
          <button type="button" class="btn btn-info" @click="refresh(fuzzyquery)">
            <i class="fa fa-search" aria-hidden="true"></i>查询
          </button>
          <button type="button" class="btn btn-info" @click="openModal(0)">
            <i class="fa fa-search" aria-hidden="true"></i>新增
          </button>
        </form>
      </div>
    </div>

    <div class="table">
      <table class="table">
        <thead>
          <tr>
            <td>设备编号</td>
            <td>设备名称</td>
            <td>设备类型</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataAll" :key="item.deviceId">
            <td>{{item.deviceCode}}</td>
            <td>{{item.deviceName}}</td>
            <td>
              {{ item.type == 0 ? '单话机' : '视频话机' }}
            </td>
            <td>
              <button type="submit" class="btn btn-sm btn-info" @click="openModal(item.deviceId)">修改</button>
              <button type="submit" class="btn btn-sm btn-default" @click="deleteItem(item.deviceId)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="modolType != null">
      <modal :modolType='modolType' :transferData='transferData' @close="close"></modal>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import modal from './edit.vue'
export default {
  data () {
    return {
      dataAll: [],
      fuzzyquery: '',
      modolType: null,
      self: this,
      transferData: {
        deviceId: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      updateState: 'updateState'
    })
  },
  created () {
    this.refresh()
  },
  watch: {
    'updateState': function () {
      this.refresh()
      this.$store.state.updateState = 0
    },
  },
  components: {
    modal
  },
  methods: {
    refresh (fuzzyquery) {
      let request = {}
      if (fuzzyquery) {
        request.deviceCode = fuzzyquery
      }
      this.$ajax.post('Device/List', request)
        .then(res => {
          if (res.data.code === 1) {
            this.dataAll = res.data.result
          }
        })
    },
    openModal (id) {
      if (id === 0) {
        this.modolType = 0
      } else {
        this.modolType = 1
        this.transferData.deviceId = id
      }
    },
    deleteItem (deviceId) {
      this.$ajax.post('Device/RemoveList', [deviceId])
        .then(res => {
          if (res.data.code === 1) {
            console.log('删除成功')
            this.refresh()
          }
        })
    },
    close () {
      this.modolType = null
    }
  }
}
</script>

