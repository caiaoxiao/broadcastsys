<template>
  <div class="content">
    <div class="groupList">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>设备组列表
        <p @click="addGroup()">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </p>
      </div>
      <el-form :model="formData" ref="formData">
        <input type="text" class="form-control form-lighter" placeholder="快速查找组" />
      </el-form>
      <ul id="height01" class="devGroup">
        <li v-for="item in deviceGroupList" :key="item.deviceGroupId" @click="refresh(item)">
          <p :contenteditable="item.contenteditable" @blur="renameDeviceGroupList(item, $event)">{{item.name}}</p>
          <ul>
            <li>
              <i class="fa fa-edit" @click.stop="(()=>{ item.contenteditable = true })"></i>
            </li>
            <li>
              <i class="fa fa-times" @click="deleteGroup(item)"></i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="singleDevice ">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>已有设备
        <p @click="open">
          <i class="fa fa-plus" aria-hidden="true"></i>添加设备</p>
      </div>
      <div class="removeDev">
        <button class="btn btn-sm btn-danger" type="button" @click="deleteDeviceAll()">全部移除</button>
      </div>
      <div class="musicList" id="end">
        <div id="groupMember" class="aa">
          <div class="singleFlies selectDelate" v-for="device in deviceList" :key="device.deviceId">
            {{device.deviceCode}}
            <span>{{device.deviceName}}</span>
          </div>
        </div>
      </div>
    </div>
    <device-list @transferData='transferData' v-show="showDeviceList" @close="close"></device-list>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { GET_USER_INFO } from 'store/getters/type'
import deviceList from './deviceList.vue'
export default {
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO,
      dialogFormVisible: 'dialogFormVisible',
      pageData: 'pageData'
    })
  },
  data () {
    return {
      self: this,
      dataAll: [],
      deviceGroupList: [],
      deviceList: [],
      targetDeviceGroup: {},
      showDeviceList: false,
      formData: {
        pid: 0,
        initialName: '',
        TempName: '',
        UserID: '',
        UserName: '',
        TempGroupID: ''
      },

    }
  },
  watch: {
    'pageData.pageSize': function () {
      this.refresh()
    },
    'pageData.pageIndex': function () {
      this.refresh()
    },
    'updateState': function () {
      this.toLeadShow = false
      if (this.updateState === 1) {
        this.refresh()
      } else if (this.updateState === 2) {
        this.refresh()
        this.$refs.tree.refresh(this.targetMenu)
      }
      this.$store.state.updateState = 0
    }
  },
  components: {
    deviceList
  },
  created () {
    this.initData()
  },
  methods: {
    // 添加分组事件
    addGroup () {
      this.deviceGroupList.push({
        name: '新建设备分组',
        contenteditable: false
      })
    },
    // 获取设备分组数据
    initData () {
      this.$ajax.post('DeviceGroup/List')
        .then(res => {
          if (res.data.code === 1) {
            let result = res.data.result
            result.forEach((r, i) => {
              r.contenteditable = false
            })
            this.deviceGroupList = result
            this.refresh(result[0])
          }
        })
    },
    // new promise
    refresh (item) {
      this.targetDeviceGroup = item
      this.$ajax.get(`DeviceGroup/Detail/${item.deviceGroupId}`)
        .then(res => {
          if (res.data.code === 1) {
            this.deviceList = res.data.result
          }
        })
    },
    deleteGroup (item) {
      this.$ajax.delete(`DeviceGroup/Remove/${item.deviceGroupId}`)
        .then(res => {
          if (res.data.code === 1) {
            this.initData()
          }
        })
    },
    // 设备组重命名
    renameDeviceGroupList (item, event) {
      let text = event.target.textContent
      if (text !== '新建设备分组') {
        this.$ajax.post('DeviceGroup/Create', { name: text })
          .then(res => {
            if (res.data.code === 1) {
              this.initData()
            }
          })
      }
      item.contenteditable = false
    },
    // 删除分组所有设备
    deleteDeviceAll () {
      this.$ajax.put('DeviceGroup/Edit', this.targetDeviceGroup)
        .then(res => {
          if (res.data.code === 1) {
            this.initData()
          }
        })
    },
    open () {
      this.showDeviceList = true
      $('.singleDevice').removeClass('moveRightMiddle').addClass('moveLeftMiddle')
      $('.allDevice').removeClass('moveRightDev').addClass('moveLeftDev')
    },
    close () {
      this.showDeviceList = false
      $('.singleDevice').removeClass('moveLeftMiddle').addClass('moveRightMiddle')
      $('.allDevice').removeClass('moveLeftDev').addClass('moveRightDev')
    },
    transferData (selectDevice) {
      if (this.deviceList.length === 0) {
        this.deviceList = selectDevice
      } else { // 数组去重
        selectDevice.map((s, k) => {
          let isReapt = this.deviceList.every((d, i) => {
            if (s.deviceId === d.deviceId) {
              return false
            }
            return true
          })
          if (isReapt) {
            this.deviceList.push(s)
          }
        })
      }
      let request = {
        deviceGroups: this.deviceList
      }
      request = Object.assign(request, this.targetDeviceGroup)
      this.$ajax.put('DeviceGroup/Edit', request)
        .then(res => {
          if (res.data.code === 1) {
            this.initData()
          }
        })
    }
  }
}
</script>



