<template>
  <!--修改or新增用户组-->
  <div :visible.sync="dialogFormVisible">
    <div class="popUpbig">
      <div class="popContent">
        <el-form ref="formData" :model="dept" :rules="rules">
          <div class="menuChoose">
            <h5><i class="fa fa-user-plus"></i></h5>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">用户组</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" v-model.trim="dept.departname" @click="checkDeptName(dept.departname)">
                      <el-row>
                        <span v-if="!isSameParent" style="color: red">不能和上级部门一样!</span>
                        <span v-if="!ckDeptName" style="color: red">部门重复!</span>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="menuChoose">
            <h5><i class="fa fa-address-card"></i>菜单权限</h5>
            <ol class="menuItem clearfix">
              <li>语音通话</li>
              <li>IP广播</li>
              <li>视频</li>
              <li>会议</li>
              <li>广播预约</li>
              <li>系统管理</li>
              <li>地图</li>
            </ol>
          </div>
          <div class="menuChoose">
            <h5><i class="fa fa-clipboard"></i>设备组权限</h5>
            <div class="row">
              <div class="col-md-6">
                <div class="subItemTitle">
                  设备组里列表
                  <label class="checkbox-inline">
                    <input type="checkbox" id="inlineCheckbox1" value="option1"> 全选
                  </label>
                </div>
                <ol class="menuItem clearfix">
                  <li>设备组名</li>
                  <li>设备组名</li>
                  <li>设备组名</li>
                  <li>设备组名</li>
                  <li>设备组名</li>
                  <li>设备组名</li>
                  <li>设备组名</li>
                </ol>
              </div>
              <div class="col-md-6">
                <div class="subItemTitle">
                  已选列表
                  <button type="button" class="btn btn-sm btn-danger">全部移除</button>
                </div>
                <ol class="menuItem clearfix">
                  <li>设备组名</li>

                </ol>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="btnDiv">
        <button type="submit" class="btn btn-sm btn-info" @click="submitFrom(self, data.deptId, 'Department/Create', 'Department/Edit', dept)">确定</button>
        <button type="submit" class="btn btn-sm btn-default" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {GET_USER_INFO} from 'store/getters/type'
  import { mapGetters,mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
      })
    },
    props: ['data'],
    data(){
      return {
        dept:{
          sortIndex:'1',
          departmentid:'',
          departname:'',
          organizationid:'',
          parentid:'',
          OrganizationID:this.data.DepartmentID
          },
        self: this,
        title: '',
        load_data: false,
        parent: {
          deptId: '',
          deptName: ''
        },
        on_submit_loading: false,
        rules: {
          departname: [{required: true, message: '用户组名称不能为空'},{validator: this.defenseSQL}]
        },
        orgId:'',
        currDeptNumber:'',
        ckDeptName:true,
        isSameParent:true
      }
    },
    created(){
      var $this=this;
      if($this.data.deptId == 0) {
        this.title='用户组新增';
        if($this.data.DepartmentID !=='0') {
          $this.parent.deptId=$this.data.DepartmentID;
          $this.$AjaxGet('Department/Detail/', $this.data.DepartmentID , function(ret) {
            if(ret.code !=0) {
              //$this.parent.deptName=ret.result.DepartName;
              //$this.dept.OrganizationID = ret.result.OrganizationID;
              //$this.dept.ParentID = $this.parent.deptId;
            }
          });
        } else {
          $this.parent.deptId= $this.data.DepartmentID;
          $this.parent.deptName=$this.data.DepartName;
        }
      } else {
        this.title= '用户组编辑';
        $this.$AjaxGet("Department/Detail/", $this.data.deptId, function (ret) {
          let result = ret.result;
          $this.dept=result;
          $this.currDeptNumber=result.DepartName;
          if ($this.dept.ParentID !== '0') {
            $this.$AjaxGet('Department/Detail/', $this.dept.ParentID, function (ret) {
              if (ret.code == 1) {
                $this.parent.deptId=ret.result.DepartmentID;
                $this.parent.deptName=ret.result.DepartName;
              }
            });
          } else {
            $this.parent.deptId='0';
            $this.parent.deptName= '';
          }
        });

      }
    },

    methods: {
      ...mapActions([
        'update',
      ]),
      checkDeptName(deptName){
        if(!deptName){
          return false;
        }
        if(deptName==this.parent.deptName){
          this.isSameParent=false;
        }else{
          this.isSameParent=true;
        }
        var $this = this;
        $this.$AjaxGet('Department/List', {
          departName: deptName,
          parentID:$this.parent.deptId
        }, function(ret) {
          if($this.data.deptId =='0') {
            if (ret.code == 1) {
              if (ret.result.length > 0) {
                $this.ckDeptName=false;
              } else {
                $this.ckDeptName=true;
              }
            } else {
              $this.ckDeptName=true;
            }
          }else{
            if($this.currDeptNumber==deptName){
              $this.ckDeptName=true;
            }else{
              if (ret.code == 1) {
                if (ret.result.length > 0) {
                  $this.ckDeptName=false;

                } else {
                  $this.ckDeptName=true;
                }
              } else {
                $this.ckDeptName=true;
              }
            }
          }

        });
      },
      close(type) {
        this.$emit('close', type);
      },
    }
  };
</script>
