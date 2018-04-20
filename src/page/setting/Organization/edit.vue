<template>
  <!--新增（修改）机构-->
  <div class="popUp" :visible.sync="dialogFormVisible" :before-close="update">
    <div class="popContent">
      <el-form class="form-horizontal" :model="org" ref="formData" :rules="rules">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label" prop="fullName">上级机构</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" disabled="disabled" v-model="org.fullName" :disabled="true">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">机构名称</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model.trim="org.orgName" :maxlength="28">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">排列序号</label>
              <div class="col-sm-8">
                <div class="el-input-number" placeholder="请输入内容">
                    <span class="el-input-number__decrease">
                      <i class="el-icon-minus"></i>
                    </span>
                  <span class="el-input-number__increase">
                      <i class="el-icon-plus"></i>
                    </span><div class="el-input">
                  <el-input-number autocomplete="off" v-model="org.sortIndex" type="text" rows="2" validateevent="true" class="form-control"></el-input-number>
                </div></div>
              </div>

            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="col-sm-4 control-label">机构编号</label>
              <div class="col-sm-8">
                <input type="text" class="form-control" v-model.trim="org.orgCode"  @blur="checkCode(org.orgCode)">
              </div>
              <div>
                <span v-if="!ckIsNumber||!ckLength" style="color: red">机构编码必须为四位数字!</span>
                <span v-if="!ckCode" style="color:red">机构编号重复!</span>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="btnDiv">
      <button type="primary" class="btn btn-sm btn-info" @click="submitFrom(self, data.orgId, 'Organization/Create', 'Organization/Edit', org)" :loading="on_submit_loading"  :disabled="!ckCode||!ckIsNumber|| !ckLength">确定</button>
      <button type="submit" class="btn btn-sm btn-default" @click="update">取消</button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {GET_USER_INFO} from 'store/getters/type'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
      }),
    },
    props: ['data'],
    data(){
        console.log(this.data)
      return {
        org: {
          sortIndex:'1',
          OrganizationID:''
        },
        formData: {
          sortIndex: 0
        },
        parent: {
          orgId: '',
          orgName: ''
        },
        pid:0,
        self: this,
        curCode: '',
        ckCode: true,
        ckLength:true,
        ckIsNumber:true,
        isHasOrgName:true,
        isHasOrgCode:true,
        load_data: false,
        title: '',
        on_submit_loading: false,
        rules: {
          orgName:[{required: true, message: '机构名称不能为空'},{validator: this.defenseSQL}],
          orgCode:[{required: true, message: '机构编码不能为空'},{validator: this.defenseSQL}],
          FullName: [{validator: this.defenseSQL, trigger: 'blur'}]
        }
      }
    },
    created(){
      let $this=this;
      this.pid = this.data.edits,
      this.org.OperatorObject = "组织机构信息";
      if(this.data.orgId == 0){
        this.title='机构管理—机构新增';
        this.org.fullName = this.data.OrgName;
        this.org.parentID = this.data.OrganizationID;
        this.org.OrganizationID = this.data.OrganizationID;
      }else{
          debugger
        this.title= '机构管理—机构编辑';
        this.$AjaxGet("Organization/Detail/", this.data.orgId, function(ret) {
          let result = ret.result;
          if(ret.code != 0) {
            $this.org= result;
            $this.org.parentID=result.ParentID;
            $this.org.fullName=result.FullName;
            $this.org.orgName = result.OrgName;
            $this.curCode = result.OrgCode;
            $this.org.orgCode = result.OrgCode
          }
        });

      }

    },
    computed: {
      ...mapGetters({
        LoginId: 'LoginId',
        dialogFormVisible: 'dialogFormVisible',
      }),
    },
    methods: {
      ...mapActions([
        'update',
      ]),
      checkCode(orgCode) {
        if(!orgCode) {
          return false;
        }
        var orgTest=/^\+?[0-9][0-9]*$/;
        if(orgTest.test(orgCode)){
          this.ckIsNumber=true;
        }else{
          this.ckIsNumber=false;
        }
        if(orgCode.length!=4){
          this.ckLength=false;
        }else{
          this.ckLength=true;
        }
        var $this = this;

        $this.$AjaxGet('Organization/List', {

          orgCode: orgCode
        }, function (ret) {
          if($this.data.orgId== undefined) {
            if (ret.code == 1) {
              if (ret.result.length > 0) {

                $this.ckCode=false;
              } else {
                $this.ckCode=true;

              }
            } else {
              $this.ckCode=true;
            }
          }else{
            if($this.curCode==orgCode){
              $this.ckCode=true;
            }else{
              if (ret.code == 1) {
                if (ret.result.length > 0) {

                  $this.ckCode=false;
                  //$this.$set('org.OrgCode', '');
                } else {
                  $this.ckCode=true;

                }
              } else {
                $this.ckCode=true;
              }
            }
          }
        });

      },
    }
  }
</script>
