<template>
  <!--设备信息新增-->
  <div class="popUp" style="display: block;">
    <div class="popContent">
      <el-form class="form-horizontal" :model="formData" ref="formData" :rules="rules">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备号</label>
              <div class="col-sm-8">
                <input type="text" placeholder="1000" class="form-control" v-model="formData.deviceCode">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">添加范围</label>
              <div class="col-sm-8">
                <input type="text" placeholder="默认为1" class="form-control" v-model="range">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备名称</label>
              <div class="col-sm-8">
                <input type="text" placeholder="" class="form-control" v-model="formData.deviceName">
              </div>
            </div>
          </div>
	<div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">密码</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.password">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备类型</label>
              <div class="col-sm-8">
                <label class="radio-inline">
                  <input type="radio" value="0" v-model="formData.type">单话机

                </label>
                <label class="radio-inline">
                  <input type="radio" value="1" v-model="formData.type">视频终端
                </label>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="btnDiv">
      <button type="button" class="btn btn-sm btn-info" @click="userEdit"
      >确定</button>
      <button type="button" class="btn btn-sm btn-default" @click="close">取消</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from 'vuex'
export default {
  props: {
    modolType:{type:Number},
    transferdata:{type:Object}
  },
  data () {
    return {
      formData: {
        deviceCode: '',
        deviceName: '',
	      password:'',
        type: 0,
        deviceVedios: [{ vedioUrl: '' }, { vedioUrl: '' }, { vedioUrl: '' }, { vedioUrl: '' }],
        feature:{ organizationID :  this.transferdata.targetMenuId ,aliasName:""}

      },
      rules: {},
      self: this,
      range:'',
    }
  },
  created () {
    this.$nextTick(() => {
      let documentHeight = document.documentElement.clientHeight
      $('.popUp').css('top', documentHeight * 0.3 + 'px')
      if (this.modolType === -2) {
        this.$ajax.get(`Device/Detail/${this.transferdata.deviceId}`)
          .then(res => {
            if (res.data.code === 1) {
              this.formData = res.data.result
              this.formData.feature.organizationID = this.transferdata.targetMenuId
              /*this.$ajax.get(`Feature/Detail/${this.transferdata.deviceId}`)
              .then(res => {
                  if (res.data.code === 1) {
                    this.formData.feature.organizationID = res.data.result.organizationID
                  }
              })*/
            }
          })
      }
    })
  },
  methods: {
    ...mapActions([
      'update'
    ]),
    close () {
      this.$emit('close')
    },
    userEdit () {
       if (this.modolType!=-2) {
       let axios = []
       let flag = this.formData.deviceName == this.formData.deviceCode?true:false
       let range = this.range==''?1:parseInt(this.range)
       for(let i = 0;i < range;i++){
        let temp = new Object()
        temp.deviceCode = String(parseInt(this.formData.deviceCode)+i)
        temp.deviceName =  flag == true ? temp.deviceCode : this.formData.deviceName+"-"+String(i+1)
	      temp.password = this.formData.password
        temp.type = this.formData.type
        temp.deviceVedios = this.formData.deviceVedios
        temp.feature = this.formData.feature
        axios.push(this.$ajax.post('Device/Create',temp))
       }
       this.$ajax.all(axios).then(res => {
         this.$message.success("新增成功")
         this.$store.dispatch('update', 1)
       })
    }
    else{
        let request = Object.assign(this.formData,{deviceId:this.transferdata.deviceId})
        this.$ajax.put(`Device/Edit`,request)
          .then(res => {
            if (res.data.code === 1) {
              this.$message.success("修改成功")
              this.$store.dispatch('update', 1)
            }
          })
      }
    },
  }
}
</script>
