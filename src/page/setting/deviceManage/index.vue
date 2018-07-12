<template>
  <div class="content padding">
    <div class="tableTool">
      <div class="operate">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" placeholder="请输入要查询的设备编号" class="form-control select-width" style="width:200px;" v-model="fuzzyquery" />
          </div>
	  <button type="button" class="btn btn-info" @click="openModal(-1)">
            <i class="fa fa-bolt" aria-hidden="true"></i>修改联动密匙
          </button>
          <button type="button" class="btn btn-info" @click="refresh(fuzzyquery)">
            <i class="fa fa-search" aria-hidden="true"></i>查询
          </button>
          <button type="button" class="btn btn-info" @click="openModal(0)">
            <i class="fa fa-plus" aria-hidden="true"></i>新增
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
            <td>所属组织id</td>
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
            <td> {{item.OrganizationID}} </td>
            <td>
              <button type="submit" class="btn btn-sm btn-info" @click="openModal(item.deviceId)">修改</button>
              <button type="submit" class="btn btn-sm btn-default" @click="deleteItem(item.deviceId)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="modolType != null && modolType !=2">
      <modal :modolType='modolType' :transferData='transferData' @close="close"></modal>
    </div>
    <div v-if="modolType ==2">
      <basechange :modolType='modolType'  @close="close"></basechange>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import modal from './edit.vue'
import basechange from './base.vue'
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
      updateState: 'updateState',
      get_user_info:'GET_USER_INFO'
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
    modal,
    basechange
  },
  methods: {
    refresh (fuzzyquery) {
      let request = {}
      if (fuzzyquery) {
        request.deviceCode = fuzzyquery
      }
      this.$ajax.get(`Feature/getFeatureByOrg/${this.$store.state.user_info.user.organizationID}?flag=true`)

        .then(res => {
          if (res.data.code === 1) {
            let data = res.data.result
	    console.log(data)
            let axios = []
            data.forEach((device)=>{
              axios.push(this.$ajax.get(`Feature/Detail/${device.deviceId}`))
            })
            this.$ajax.all(axios)
                  .then((res) => {
                      for (let i = 0 ; i< res.length ; i++){
			if(res[i].data.result!=null)
                        data[i].OrganizationID = res[i].data.result.organizationId
                      }
		    console.log(data)
                    this.dataAll = data
               })
          }
        })
    },
    openModal (id) {
      if (id === 0) {
        this.modolType = 0
      } else if(id !=-1){
        this.modolType = 1
        this.transferData.deviceId = id
      }else{
	this.modolType = 2 
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

