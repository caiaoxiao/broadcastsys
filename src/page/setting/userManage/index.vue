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
        <span><button type="submit" class="btn btn-sm btn-info" @click="openModal(0)">新增用户</button></span>
        <div class="operate" >
          <div class="menuType">
              <p @click="open">
                <i class="fa fa-plus" aria-hidden="true"></i>添加设备组</p>
          </div>
          <!--<button type="submit" class="btn btn-sm btn-info" @click="openModal(-1)">新增设备组</button>-->
          <!--<button type="submit" class="btn btn-sm btn-info" :disabled="batch_select.length === 0" @click="on_batch_del">
              <i class="fa fa-search" aria-hidden="true"></i>批量删除
            </button>-->
        </div>
      </div>
      <div class="table">
        <table class="table">
          <caption> <h3> 用户 </h3> </caption>
          <thead>
            <tr>
              <td>用户名</td>
              <td>所属用户组</td>
              <td>所属机构</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in dataAll"  :key = "data.userID" >
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
        <h3 v-if = "allDevices.length>0">全部设备</h3>
        <table class = "table" >
          <caption>
          <span> {{this.targetUserGroup}} </span>
          <button type="button" class="btn btn-sm btn-info" @click="openModal(data.userID)">添加设备</button>
          </caption>
          <thead>
            <tr>
              <td>设备编号</td>
              <td>设备名称</td>
              <td>设备类型</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="device in allDevices" >
              <td>{{device.deviceCode}}</td>
              <td>{{device.deviceName}}</td>
              <td>
                {{ device.type == 0 ? '单话机' : '视频话机' }}
              </td>
              <td>
                <button type="submit" class="btn btn-sm btn-default" @click="deleteItem(device.deviceId)">删除</button>
              </td>
            </tr>
          </tbody>
      </table>
        <h3 v-if = "deviceGroups.length>0">设备组</h3>
        <table class = "table" v-for = "group in deviceGroups" >
          <caption> <span> {{group.name}} </span> 
          <button type="submit" class="btn btn-sm btn-info" @click="editDeviceGroup(group.deviceGroupId)">添加设备</button>
          <button type="submit" class="btn btn-sm btn-info" @click="deleteDeviceGroup(group.deviceGroupId)">删除</button>
          </caption>
          <thead>
            <tr>
              <td>设备编号</td>
              <td>设备名称</td>
              <td>设备类型</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in group.deviceGroups" >
              <td>{{item.deviceCode}}</td>
              <td>{{item.deviceName}}</td>
              <td>
                {{ item.type == 0 ? '单话机' : '视频话机' }}
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-info" @click="openModal(data.userID)">修改</button>
                <button type="submit" class="btn btn-sm btn-default" @click="deleteItem(item.deviceId)">删除</button>
              </td>
            </tr>
          </tbody>
      </table>

        <!--<paging></paging>-->
      </div>
      <div v-if="modolType!=null && modolType >= 0">
        <modal :targetMenu="targetMenu" :modolType='modolType' @close="closeModal"></modal>
      </div>
      <div v-if="modolType == -1">
        <add :targetMenu="targetMenu" :modolType='modolType' @close="closeModal"></add>
      </div>
    </div>
    <device-list :targetMenu='targetMenu' @transferData='transferData' ref="deviceList" v-show="showDeviceList" @close="close"></device-list>
  </div>
</template>
<script>
import deviceList from './deviceList.vue'
import { mapGetters } from 'vuex'
import tree from '../structureTree/index.vue'
import paging from '../paging/index.vue'
import modal from './modal.vue'
import add from './addDeviceGroup.vue'
import {getHeights} from 'utils/page/setting'
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
      showDeviceList: false,
      labels,
      selectUser: [],
      dataAll: [],
      deviceGroups:[],
      targetMenu: {},
      self: this,
      modolType: null,
      targetUserGroup:null,
      allDevices:[],
      targetUserGroupId:""
    }
  },
  watch: {
    'TreeData': {
      handler: function (data) {
        this.targetMenu = data
        this.targetUserGroup = data.OrgName
        /*this.deviceGroups.forEach(
          (item,index)=>{
            this.deviceGroups.splice(index,1)
          }
        )*/
        this.$nextTick(function () {
            this.refresh()
            getHeights()
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
    'deviceGroups':(data)=>{
	console.log(data)}
  },
  components: {
    tree,
    modal,
    paging,
    add,
    deviceList,
  },
  created () {
    this.refresh()
    this.OrgUrl = 'Organization/TreeRoot/' + this.$store.state.user_info.user.organizationID
     getHeights()
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
      this.$ajax.get(`Feature/getFeatureByOrg/${this.targetMenu.OrganizationID}`)
        .then((res) => {
          if (res.data.code === 1) {
            this.allDevices = res.data.result
          }
        })
      this.$ajax.post(`Role/List`)
        .then((res) => {
          if (res.data.code === 1) {
            let groupList = res.data.result
            this.targetUserGroupId = ""
            groupList.forEach(element => {
              if(element.roleName == this.targetUserGroup){
                this.targetUserGroupId = element.roleID
              }
            })
            if(this.targetUserGroupId!="")
          this.$ajax.get(`Role/getDeviceGroup/${this.targetUserGroupId}`)
          .then((res) => {
            if (res.data.code === 1) {
              let result = res.data.result
              let length = result.length
              this.deviceGroups = []
              let axios = []
              for (let i = 0 ; i < length ; i++){
		            axios.push(this.$ajax.get(`DeviceGroup/Detail/${result[i].deviceGroupId}`))
	            }
              this.$ajax.all(axios)
                  .then((res) => {
                      for (let i = 0 ; i<length ; i++){
                        this.deviceGroups.push(res[i].data.result)
                      }
               })
            }
          })
          else
            this.deviceGroups = []
          }
        })
    },
    openModal (id) {
      // 编辑或新增
      if (id === -1)
	this.modolType = -1
      else if (id === 0) {
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
    transferData (selectDevice,newDeviceGroupName) {
      this.$ajax.post('DeviceGroup/Create',{name:newDeviceGroupName,deviceGroups:selectDevice})
      .then(res => {
          if (res.data.code === 1) {
            let targetDeviceGroup =  res.data.result.deviceGroupId
            this.deviceGroups = this.deviceGroups.concat([{deviceGroupId:targetDeviceGroup}])
            this.$ajax.post(`Role/opRoleDevice/${this.targetUserGroupId}`,this.deviceGroups)              
              .then(res => {
                 if (res.data.code === 1) {
                   console.log('新增成功')
                   this.refresh()
                 }
              })
            
          }
        })
      
    },//添加设备组
    deleteDeviceGroup(deviceGroupId){
      this.$ajax.post('DeviceGroup/RemoveList',[deviceGroupId])
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

