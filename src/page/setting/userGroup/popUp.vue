<template>
<!--修改or新增用户组-->
<div :visible.sync="dialogFormVisible" :before-close="update">
  <div class="popUpbig" STYLE="display: block">
    <div class="popContent">
      <el-form ref="dept" :model="dept" :rules="rules">
        <div class="menuChoose">
          <h5><i class="fa fa-user-plus"></i></h5>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-sm-2 control-label">用户组名</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="menuChoose">
          <h5><i class="fa fa-address-card"></i>菜单权限</h5>
          <ol class="menuItem clearfix">
            <li v-for="(item,index) in menuList"
                :class="{'selected':item.selected}"
                @click="selectMenu(index)">{{item.text}}</li>
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
                <li v-for="(item,index) in deviceGroup"
                    :class="{'selected':item.selected}"
                    @click="selectDevice(index)">{{item.TempName}}</li>
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
      <button type="submit" class="btn btn-sm btn-info" @click="submitFrom(self, data.pid, 'TempGroup/Create', 'TempGroup/Edit', dept)">确定</button>
      <button type="submit" class="btn btn-sm btn-default" @click="close">取消</button>
    </div>
  </div>
</div>
</template>
<script type="text/javascript">
  import {GET_USER_INFO} from 'store/getters/type'
  import { mapGetters,mapActions } from 'vuex'
  export default {
    props: ['data'],
    computed: {
      ...mapGetters({
        dialogFormVisible: 'dialogFormVisible',
        get_user_info: GET_USER_INFO,
        pageData: 'pageData',

      })
    },
    data(){
      return {
        dept:{
          pid:0,
          TempName:'',
          UserID:this.$store.state.user_info.user.UserID,
          UserName:this.$store.state.user_info.user.UserName,
          OrganizationID: this.$store.state.user_info.user.OrganizationID,
          selectDevice:[],
          selectmenu:[],
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
          TempName: [{required: true, message: '用户组名称不能为空'},{validator: this.defenseSQL}]
        },
        orgId:'',
        currDeptNumber:'',
        ckDeptName:true,
        isSameParent:true,
        deviceGroup:[],
        deviceName:[],
        menuList:[
          {
              text:'语音通话',
              selected:false
          },{
            text:'IP广播',
            selected:false
          },
          {
            text:'视频',
            selected:false
          },
          {
            text:'会议',
            selected:false
          },
          {
            text:'广播预约',
            selected:false
          },
          {
            text:'系统管理',
            selected:false
          },
          {
            text:'系统设置',
            selected:false
          },
          {
            text:'地图',
            selected:false
          }
        ]
      }
    },
    watch: {
      'pageData.pageSize': function () {
        this.refresh()
      },
      'pageData.pageIndex': function () {
        this.refresh()
      }
    },
    created(){
      this.refresh()
    },
    methods: {
      ...mapActions([
        'update',
      ]),
      refresh(){
        var request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
        }
        this.$AjaxPost("TempGroup/List", request, function (ret) {
          if (ret.code == 1) {
            this.deviceGroup = ret.result;
            this.pageData.total = ret.total
            this.loading = false
          }
        }.bind(this));
        this.$AjaxGet("TempGroup/Detail/", this.data.TempGroupID, function (ret) {
          let result = ret.result;
          this.dept = result;
        }.bind(this));

      },
      selectDevice(index) {
        this.$set(this.deviceGroup[index],"selected",!this.deviceGroup[index].selected);
      },
      selectMenu(index) {
          debugger
        this.$set(this.menuList[index],"selected",!this.menuList[index].selected);
        if(this.menuList[index].selected!=false) {
       }
      },
      deleteAll() {
        this.selectDevice = []
      },
      /*checkDeptName(deptName){
        if(!deptName){
          return false;
        }
        if(deptName==this.parent.deptName){
          this.isSameParent=false;
        }else{
          this.isSameParent=true;
        }
        var $this = this;
        $this.$AjaxGet('TempGroup/List', {
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
      },*/
      close(type) {
        this.$emit('close', type);
      },
    }
  };
</script>
