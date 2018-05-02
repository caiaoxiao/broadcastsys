<template>
  <!--新增用户至用户组-->
  <div :visible.sync="dialog">
    <div class="popUpbig" id="add" STYLE="display: block">
      <div class="groupName"><i class="fa fa-user-plus" ></i>新增用户组</div>
      <div class="orgDisplay">
        <form class="form-inline">
          <div class="form-group"style="width: calc(100% - 90px)">
            <input class="form-control" style="width: 100%" type="text" placeholder="快速查找用户">
          </div>
          <button type="submit" class="btn btn-sm btn-info">
            <i aria-hidden="true" class="fa fa-search"></i>查询
          </button>
        </form>
        <div class="orgList">
          <tree :addr="OrgUrl" ref="tree" :lable="labels" @initData="initDatas"></tree>
        </div>
        <div class="orgMember">
          <ul class="userList">
            <li class="selected" v-for="item in this.user">
              <i class="fa fa-user" ></i>
              {{item.UserName}}
              <span class="fa fa-check-circle"></span>
            </li>
          </ul>
          <div class="selectAll">全选</div>
        </div>
      </div>
      <div class="selectedMember">
        <div class="groupName"><i class="fa fa-users" ></i>隋岳组</div>
        <ul class="userList">
          <li class="active"><i class="fa fa-user" ></i>马大哈<span class="fa fa-times-circle"></span></li>

        </ul>
        <div class="selectAll">全部移除</div>
      </div>

      <div class="btnDiv">
        <button type="submit" class="btn btn-sm btn-info">确定</button>
        <button type="submit" class="btn btn-sm btn-default" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/deviceGroup'
  import tree from "../structureTree/index.vue"
  export default {
    props: ['user'],
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData:'pageData',
        updateState: 'updateState',
        TreeData: 'TreeData'
      })
    },
    data(){
      return {
        OrgUrl: 'Organization/TreeRoot/'+this.$store.state.user_info.user.OrganizationID,
        labels: {
          defaultId: "OrganizationID",
          treeName: "OrgName"
        },
        selectUser: [],
        userData:{
          OrganizationID:''
        },
        //请求时的loading效果
        loading: true,
        changeTitle:'',
        targetMenu:{},
        self: this,
      }
    },
    watch:{
      'pageData.pageSize':function () {
        this.refresh();
      },
      'pageData.pageIndex':function(){
        this.refresh();
      },
      'updateState': function() {
        if(this.updateState === 1) {
          this.refresh()
        }else if(this.updateState === 2) {
          this.refresh()
          this.$refs.tree.refresh(this.targetMenu)
        }
        this.$store.state.updateState = 0
      },
      'TreeData':  {
        handler:function(data){
          this.initParentID = null
          this.targetMenu = data
          this.orgData = data
          this.orgData.OrganizationID = data.OrganizationID
          this.$nextTick(function () {
            this.refresh()
          })
        },
        deep:true
      }
    },
    components: {
      tree,
    },
    created(){

    },
    methods: {
      initDatas (data) {
        if(!this.targetMenu.hasOwnProperty("OrganizationID") && data) {
          this.orgData = data
          this.orgData.OrganizationID = data.OrganizationID;
          this.refresh()
        }
      },
      //获取数据
      refresh(){

      },
      //选中行
      selectClick(index, user) {
        let target = $(".selectedMember>ul>li").eq(index)
        if(target.hasClass('selected')) {
          this.selectUser.forEach(function(s, i) {
            if(s.roleID == user.roleID) {
              this.selectUser.splice(i, 1)
            }
          }.bind(this))
        }else {
          this.selectUser.push(user)
        }
        this.selectUser
        target.toggleClass("selected")
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //全部删除
      on_batch_del(){
        var batchArr=[];
        for(var i=0;i<this.batch_select.length;i++){
          batchArr.push(this.batch_select[i].UserID);
        }
        var request = {
          Ids: batchArr,
          LoginId: this.get_user_info.user.UserID,
          OperatorObject: "人员信息"
        };
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.loading = true
            this.$AjaxPost('User/RemoveList/',request, function(ret){
              if(ret.code == 1){
                this.refresh()
                this.$refs.tree.refresh(this.targetMenu);
                this.$message.success("删除成功！")
              }else{
                this.$message.success("删除失败！")
              }
            })
          })
      },
      close(){
        this.$emit('close')
          this.refresh();
      },
      closeChange(){
        if(this.chanOrg){
          this.chanOrg=false;
          this.$refs.tree.refresh(this.targetMenu);
          this.refresh();
        }
      },
      methods: {
        ...mapActions([
          'update'
        ]),
      }

    }
  }
</script>

