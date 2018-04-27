<template>
  <!--新增用户-->
  <div class="popUp" :visible.sync="dialogFormVisible" :before-close="update">
    <div class="popContent">
      <el-form class="form-horizontal" :model="formData" ref="formData" :rules="rules">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">用户名</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model="formData.userName">
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
      </el-form>
      <div class="menuChoose">
        <h5><i class="fa fa-address-card"></i>用户组</h5>
        <ol class="menuItem clearfix">
          <li class="selected">隋岳组</li>
          <li>隋岳组</li>
          <li>隋岳组</li>
          <li>隋岳组</li>
          <li>隋岳组</li>
          <li>隋岳组</li>
          <li>隋岳组</li>
        </ol>
      </div>
    </div>
    <div class="btnDiv">
      <button type="submit" class="btn btn-sm btn-info" @click="submitFrom(self, data.pid, 'User/Create', 'User/Edit', formData)">确定</button>
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
        formData: {
          userName: '',
          password: '',
          OrganizationID: '',
          userGroup:''
        },
        rules: {
          userName:[{required: true, message: '用户名不能为空'},{validator: this.defenseSQL}],
          userPassword:[{required: true, message: '密码不能为空'},{validator: this.defenseSQL}],
        },
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
      }),
    },
    created(){
      let $this=this;
      this.pid = this.data.edits;
      if(this.data.orgId == 0){
        this.formData.UserName = this.data.UserName;
        this.formData.OrganizationID = this.data.OrganizationID;
      }else{
        this.$AjaxGet("User/Detail/",this.data.userId, function(ret) {
          let result = ret.result;
          if(ret.code != 0) {
            let result = ret.result
            $this.formData= result
            $this.formData.userName=result.userName;
            $this.formData.password=result.password;
            //$this.formData.userGroup = result.userGroup;

          }
        });
      }
    },
    methods: {
      ...mapActions([
        'update'
      ]),
    }
  }
</script>
