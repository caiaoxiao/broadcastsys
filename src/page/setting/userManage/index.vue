<template>
  <div class="content">
    <div v-if="modolType!=null && modolType >=0 ">
        <modal :targetUserGroupId="targetUserGroupId" :targetMenu="targetMenu" :modolType='modolType' @close="closeModal" @refresh="refresh"></modal>
      </div>
      <div v-if="modolType!=null && modolType < 0">
        <edit :transferdata="transferdata" :modolType='modolType' @close="closeModal" @refresh="refresh"></edit>
      </div>
    <device-list :targetMenu='targetMenu' @transferData='transferData' ref="deviceList" v-show="showDeviceList" @close="close"></device-list>
    <div class="groupList">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>组织机构
        <span><button type="button" class="btn btn-sm btn-info" @click="changeStatus">修改</button></span> 
      </div>
      <tree :deviceGroupsDelete="deviceGroupsDelete" :users="dataAll" :targetUserGroupId ="targetUserGroupId" :status = status :addr="OrgUrl" ref="tree" :lable="labels" @setInitData="initDatas" @refresh="refresh"></tree>
    </div>
    <div class="singleDevice">
      <!--div class="tableTool">
        <!--div class="operate" >
              <p @click="open">
                <button type="button" class="btn btn-sm btn-info" >添加设备组</button></p>
          <!--<button type="submit" class="btn btn-sm btn-info" @click="openModal(-1)">新增设备组</button>-->
          <!--<button type="submit" class="btn btn-sm btn-info" :disabled="batch_select.length === 0" @click="on_batch_del">
              <i class="fa fa-search" aria-hidden="true"></i>批量删除
            </button>-->
        </div-->
      </div-->
      <div class="table">
        <h3> 号码分配 </h3>
        <table class="table">
         <caption>
        </caption>
          <thead>
            <tr>
              <td>页面verto号码</td>
              <td>告警号码</td>
              <td>语音呼叫号码</td>
              <td>广播号码</td>
              <td>会议呼叫号码</td>
              <td>值班电话号码  
                <button type="button" class="btn btn-sm btn-info watcher"  @click = "enable_watcher==true?editWatcher():setWatcherState(true)" > {{enable_watcher==true?"修改值班电话":"启用值班模式"}}</button>
                <button type="button" v-if = "enable_watcher"  class="btn btn-sm btn-info watcher"  @click = "setWatcherState(false)" > {{"关闭值班模式"}}</button>  
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{verto}}</td>
              <td>{{alarm}}</td>
              <td>{{voice}}</td>
              <td>{{broad}}</td>
              <td>{{meeting}}</td>
              <td  :contenteditable = "contenteditable"  @keydown.13 = "editWatcherFinished($event)" >{{enable_watcher==true?watcher:""}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table">
        <h3> 用户 </h3> 
        <span style="float:right"><button type="submit" class="btn btn-sm btn-info" @click="openModal(1 ,0)">新增用户</button></span>
        <table class="table">
	      <caption>
        </caption>
          <thead>
            <tr>
              <td>用户名</td>
              <td>所属用户组</td>
              <td>所属机构</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in dataAll"  :key = "data.userid" >
              <td>{{ data.username }}</td>
              <td>{{ data.rolename }}</td>
              <td>{{ data.orgname }}</td>
              <td width="170">
                <button type="button" class="btn btn-sm btn-info" @click="openModal( 1 ,data.userid)">修改</button>
                <button type="button" class="btn btn-sm btn-default" @click="deleteUser(data.userid)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 v-if = "allDevices.length>=0">全部设备</h3>
        <table class = "table" alt="暂无记录">
          <caption>
          <span> {{this.targetUserGroup}} </span>
          <button type="button" class="btn btn-sm btn-info" @click="open">设备分组</button>
          <button type="button" class="btn btn-sm btn-info" @click="openModal(-1 ,0)">添加设备</button>
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
              <td>{{device.devicecode}}</td>
              <td>{{device.devicename}}</td>
              <td>
                {{ device.type == 0 ? '单话机' : '视频话机' }}
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-info" @click="openModal(-1 ,device.deviceid)">修改</button>
                <button type="button" class="btn btn-sm btn-default" @click="deleteDevice(device.deviceid,device.devicecode)">删除</button>
              </td>
            </tr>
          </tbody>
      </table>
        <h3 v-if = "deviceGroups.length>0">设备组</h3>
        <table class = "table" v-for = "group in deviceGroups" >
          <caption> <span> {{group.name}} </span> 
          <button type="button" class="btn btn-sm btn-info" @click="deleteDeviceGroup(group.devicegroupid)">删除</button>
          </caption>
          <thead>
            <tr>
              <td>设备编号</td>
              <td>设备名称</td>
              <td>设备类型</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in group.deviceGroups" >
              <td>{{item.devicecode}}</td>
              <td>{{item.devicename}}</td>
              <td>
                {{ item.type == 0 ? '单话机' : '视频话机' }}
              </td>
            </tr>
          </tbody>
      </table>
</div>
</div>
        <!--<paging></paging>-->
  </div>
</template>
<script>
import deviceList from './deviceList.vue'
import { mapGetters } from 'vuex'
import tree from '../structureTree/index.vue'
import paging from '../paging/index.vue'
import modal from './modal.vue'
import edit from  './edit.vue'
import {getHeights} from 'utils/page/setting'
import { GET_USER_INFO } from 'store/getters/type'
const labels = {
  defaultId: 'organizationid',
  treeName: 'orgname'
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
      status:"show",
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
      targetUserGroupId:"",
      transferdata: {deviceId: '' ,targetMenuId:'' },
      deviceGroupsDelete:[],
      verto: "",
      meeting: "",
      voice: "",
      broad: "",
      alarm: "",
      watcher:"",
      enable_watcher:"",
      instance : this.$ajax.create({
   			 baseURL: 'https://scc.ieyeplus.com:8001/'
      }),
      contenteditable:false,
    }
  },
  watch: {
    'TreeData': {
      handler: function (data) {
        this.targetMenu = data
        this.transferdata.targetMenuId = data.organizationid
        this.targetUserGroup = data.orgname
        this.modolType =  null
        /*this.deviceGroups.forEach(
          (item,index)=>{
            this.deviceGroups.splice(index,1)
          }
        )*/
        this.$nextTick(function (){
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
    paging,
    deviceList,
    edit,
  },
  created () {
    this.$nextTick(()=> {
    	this.refresh()
    	getHeights()
    })  
    this.targetMenu = this.TreeData
    this.targetUserGroup = this.$store.state.user_info.user.orgname
    this.OrgUrl = 'Organization/TreeRoot/' + this.$store.state.user_info.user.organizationid
  },
  methods: {  //  组织机构树默认选中
    editWatcherFinished(event){

       event.target.contentEditable = "false"
       let text = event.target.textContent
       this.watcher = text
       this.instance({
          method: 'post',
          url: '/watcher/update/'+ this.transferdata.targetMenuId,
          data:{
            watcher:text
          }
  			}).then((res)=>{
		      console.log("watcher更新成功")
		    })
    },
    editWatcher(){
      this.contenteditable = true
    },
    setWatcherState(state){
      this.instance({
    			method: 'post',
          url: '/watcher/'+ this.transferdata.targetMenuId,
          data:{
            enable_watcher: state
          }
  			}).then((res)=>{
          this.enable_watcher = state
		    })
    },
    initDatas (data) {
      if (!this.targetMenu.hasOwnProperty('organizationid') && data) {
        this.targetMenu = data
        this.refresh()
      }
    },
    // 渲染表格数据
    refresh () {
      console.log(this.transferdata)
      let request = {
        organizationid: this.targetMenu.organizationid
      }
      this.$ajax.post('User/List', request)
        .then((res) => {
          if (res.data.code === 1) {
            this.dataAll = res.data.result
          }
        })
      if(this.transferdata.targetMenuId!=undefined && this.transferdata.targetMenuId!="")
      this.$ajax.get(`Organization/Detail/${this.transferdata.targetMenuId}`)
        .then((res) => {
          if (res.data.code === 1) {
		    this.verto = res.data.result.vertoid
    		this.meeting = res.data.result.meetingid
    		this.voice = res.data.result.voicecallid
    		this.alarm = res.data.result.alarmid
    		this.broad = res.data.result.broadid
		
		this.instance({
    			method: 'get',
    		        url: '/organization/'+ this.transferdata.targetMenuId,
  			}).then((res)=>{
    			this.watcher = res.data.watcher
		        this.enable_watcher = res.data.enable_watcher
		})
          }
      })
      this.$ajax.get(`Feature/getFeatureByOrg/${this.targetMenu.organizationid}`)
        .then((res) => {
          if (res.data.code === 1) {
            this.allDevices = res.data.result
	    this.allDevices.sort((x,y)=>{return x.devicecode > y.devicecode}) 
          }
        })
      this.$ajax.post(`Role/List`)
        .then((res) => {
          if (res.data.code === 1) {
            let groupList = res.data.result
            this.targetUserGroupId = ""
            groupList.forEach(element => {
              if(element.rolename == this.targetUserGroup){
                this.targetUserGroupId = element.roleid
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
		   axios.push(this.$ajax.get(`DeviceGroup/Detail/${result[i].devicegroupid}`))
	            }
              this.$ajax.all(axios)
                  .then((res) => {
                      for (let i = 0 ; i<length ; i++){
			if(!this.deviceGroups.some((item)=>{return item.devicegroupid == res[i].data.result.devicegroupid})){
          res[i].data.result.deviceGroups.sort((x,y)=>{return x.devicecode > y.devicecode})
          this.deviceGroups.push(res[i].data.result)
          this.deviceGroupsDelete.push(res[i].data.result.devicegroupid)
		        	}
                }
                console.log(this.deviceGroups)
               })
            }
          })
          else
            this.deviceGroups = []
          }
        })
    },
    openModal (status , id) {
      // 编辑或新增
      if (status == 1){
       if (id === 0) {
        this.modolType = 0
      } else {
        this.modolType = 1
        this.targetMenu.userid = id
      }
      }
        if (status == -1){
       if (id === 0) {
        this.modolType = -1
      } else {
        this.modolType = -2
        this.transferdata.deviceid = id
      }
      }
    },
    closeModal () {
      this.modolType = null
    },
    deleteDevice (deviceId,deviceCode){
      let request = {}
      request.deviceId = deviceId
      request.deviceCode = deviceCode
      this.$ajax.post('Device/deletes', [request])
        .then(res => {
          if (res.data.code === 1) {
            console.log('删除成功')
            this.refresh()
          }
        })
    },
    deleteUser (userId) {
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
            let targetDeviceGroup =  res.data.result.devicegroupid
            this.deviceGroups = this.deviceGroups.concat([{devicegroupid:targetDeviceGroup}])
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
      
    },

  editDeviceGroup(deviceGroupId){
      this.showDeviceList = true
      $('.singleDevice').removeClass('moveRightMiddle').addClass('moveLeftMiddle')
      $('.allDevice').removeClass('moveRightDev').addClass('moveLeftDev')
  
  },
  changeStatus(){
    if(this.status == "show")
    this.status = "change"
    else
    this.status = "show"
  },

  }
}

</script>
<style  scoped>
.watcher{
margin-left:5px;
}
</style>


