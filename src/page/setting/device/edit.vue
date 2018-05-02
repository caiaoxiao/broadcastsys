<template>
  <!--设备信息新增-->
  <div class="popUp" style="display: block;" :visible.sync="dialogFormVisible" :before-close="update">
    <div class="popContent">
      <el-form class="form-horizontal" :model="formData" ref="formData" :rules="rules">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.FeatureCode">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">设备名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.FeatureName">
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
                  <el-radio class="radio" v-model="formData.FeatureType" :label="0">单话机</el-radio>
                </label>
                <label class="radio-inline">
                  <el-radio class="radio" v-model="formData.FeatureType" :label="1">视频终端</el-radio>
                </label>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">绑定摄像头IP</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.CameraIp">
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="btnDiv">
      <button type="submit" class="btn btn-sm btn-info" @click="submitFrom(self, data.pid, 'Feature/Create', 'Feature/Edit', formData)">确定</button>
      <button type="submit" class="btn btn-sm btn-default" @click="update">取消</button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'

  export default{
    props: ['data'],
    data(){
      return {
        self: this,
        action: this.Api,
        showTree: false,
        labels: {
          defaultId: "OrganizationID",
        },
        DicArr: [],
        DynLabels: [],
        OrgUrl: '',
        HwyBelongToArr: [],
        DirectionArr: [],
        formData: {
          FeatureName: '',
          FeatureCode: '',
          FeatureType: '',
          OrganizationID: '',
          SystemType: 1
        },
        rules: {
          FeatureCode: [{validator: this.FeatureCode, trigger: 'blur'}],
          FeatureName: [{validator: this.FeatureName, trigger: 'blur'}],
        },
        oTest: {},
        fileList: [],
        PositionArr: [],
        fileListShow: []
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
      }),
    },
    created(){
      this.refresh();
    },
    methods: {
      ...mapActions([
        'update',
      ]),
      refresh(){
        this.pid = this.data.pid;
        if(this.data.pid != 0){
          //修改
          this.$AjaxGet("Feature/Detail/", this.data.FeatureBaseID, function(ret) {
            let result = ret.result;
            if(ret.code != 0) {
              $this.formData= result;
              $this.formData.FeatureCode=result.featureCode;
              $this.formData.FeatureName=result.featureName;
              $this.formData.FeatureType = result.featureType;
              $this.formData.CameraIp = result.cameraIp;
            }
          });
        }
      },
    }
  }
</script>
