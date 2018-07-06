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
                <input type="text" class="form-control" v-model="formData.deviceCode">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.deviceName">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">所属组织id</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.feature.organizationID">
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
      <button type="button" class="btn btn-sm btn-info" @click="submitFrom(self, modolType==-2?1:0, 'Device/Create', 'Device/Edit', formData,1)">确定</button>
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
        type: 0,
        deviceVedios: [{ vedioUrl: '' }, { vedioUrl: '' }, { vedioUrl: '' }, { vedioUrl: '' }],
        feature:{ organizationID :  this.transferdata.targetMenuId , aliasName:""}

      },
      rules: {},
      self: this
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
    }
  }
}
</script>
