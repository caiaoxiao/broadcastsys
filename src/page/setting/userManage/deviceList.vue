<template>
  <div class="allDevice ">
    <div class="menuType">
      <i class="fa fa-list-ul" aria-hidden="true"></i>设备列表
      <button  type="button" class="btn btn-sm btn-info" @click="confirmAddAll">全部添加</button>
      <button  type="button" class="btn btn-sm btn-info" @click="confirmAdd">确定添加</button>
    </div>
    <form style="padding:5px 10px">
      <span>请输入新设备组名称</span>
      <input  v-model="newDeviceGroupName" style="width: 50% ;margin:5px 0px" type="text" class="form-control form-lighter" placeholder="" />
    </form>
    <div class="musicList" id="height02">
      <div id="SelectedMembers" class="aa">
        <div class="singleFlies" :class="{selected: device.selected}" v-for="device in deviceList" :key="device.deviceId" @click="selectDeviceEvent(device)">
          {{device.devicecode}}
          <span>{{ device.devicename }}</span>
        </div>
      </div>
    </div>
    <div class="sidder" @click="close()">
      <i class="fa fa-2x fa-angle-double-right"></i>
      <span>收起</span>
    </div>
  </div>
</template>
<script>
import { getHeight } from 'utils/height'
import { getHeights } from 'utils/page/deviceGroup'

export default {
  props: {
    targetMenu: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      deviceList: [],
      selectDevice: [],
      fuzzyQuery:'',
      newDeviceGroupName:'',
    }
  },
  created () {
    this.$nextTick(function () {
      getHeight()
      getHeights()
      this.refresh()
    })
  },
  watch:{
    'targetMenu': function(){
      this.$ajax.get('Feature/getFeatureByOrg/' + this.targetMenu.organizationid)
        .then((res) => {
          if (res.data.code === 1) {
            let result = res.data.result
            result.forEach((r, i) => {  
              r.selected = false
            })
            this.deviceList = result
          }
        })
    }
  },
  methods: {
    refresh () {
      
    },
    selectDeviceEvent (device) {
      if (!device.selected) {
        if(this.selectDevice.length == 0) {
          this.selectDevice.push(device)
        }else {
          let isRepeat = this.selectDevice.find(item => item.deviceid == device.deviceid)
          if(!isRepeat) {
            this.selectDevice.push(device)
          }
        }
        
      }
      else{
      this.selectDevice.forEach((de,index)=>{
       if(device.deviceid == de.deviceid) 
	this.selectDevice.splice(index,1)	
       })
      }
      device.selected = !device.selected
    },
    confirmAdd () {
      
      if (this.deviceList.length !== 0 && this.selectDevice.length !== 0) {
        this.$emit('transferData', this.selectDevice,this.newDeviceGroupName)
      }
    },
    confirmAddAll () {
      if (this.deviceList.length !== 0) {
        this.$emit('transferData', this.deviceList,this.newDeviceGroupName)
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.menuType button{
float:right;}
</style>
