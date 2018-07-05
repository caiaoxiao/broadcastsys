<template>
  <div class="dept">
    <el-tree
      ref="tree"
      :data="data"
      highlight-current 
      :props="defaultProps"
      :default-expanded-keys="defaultExpanded"
      node-key="OrganizationID"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent"
    >
    </el-tree>
  </div>
</template>

<script>
  import { mapGetters,mapActions } from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'

  export default {
    props: {
      Api: {
        type: String,
        default: ''
      },
      status:{
        type: String
      },
      targetUserGroupId:{
        type: String
      },
      users:{
        type: Array
      },
      deviceGroupsDelete:{
        type:Array
      }
    },
    watch:{
      targetUserGroupId:(targetUserGroupId)=>{
        console.log(targetUserGroupId)
      }
    },
    data() {
      return {
        data: [],
        defaultExpanded: [],
        defaultProps: {
          children: 'Children',
          label: 'OrgName'
        },

      };
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
      }),
    },
    created() {
      this.$nextTick(function() {
        this.refresh();

      })
    },
    methods: {
      ...mapActions([
        'TreeChange',
        'setInitData'
      ]),
      refresh () {
        this.$ajax.get('https://scc.ieyeplus.com:8443/IpBc/' + 'Organization/Data/' + this.get_user_info.user.organizationID)
          .then((res) => {
            let data = res.data.result
            console.log(data)
            this.data = data
            // 初始化树对象
            this.$emit('setInitData', data[0])
            //  循环出默认展开项的ID
            for(let i in data) {
              this.defaultExpanded.push(data[i]['OrganizationID'])
            }
            this.$nextTick(()=> {
              this.$refs.tree.$children[0].$el.className = this.$refs.tree.$children[0].$el.className + ' ' + 'is-current'
            })
          });
      },
      handleNodeClick(data, node, event) {
        if(event) {                           // 判断点击的是否为默认选中的树节点，如果不是，取消默认选中
          if(node.id != this.$refs.tree.$children[0].node.id) {
            this.$refs.tree.$children[0].$el.className = 'el-tree-node'
          }
        }
        // 提交树对象，以及当前点击树菜单的数据至仓库
        this.TreeChange({data, node})
      },
      append(data,node) {
            const newChild = { OrganizationID:data.OrganizationID,ChildNum: 0, OrgName:"新建组织机构", Children: [] };
            if (!data.Children) {
              this.$set(data, 'Children', []);
            }
            data.Children.push(newChild)
            this.TreeChange({data, node})
          
      },
      remove(node, data) {
        let parent = node.parent
        parent.data.Children.pop()
        let request = []
        this.users.forEach((element) => {
          request.push(element.userID)
        })
        if(request.length>0) {
        this.$ajax.post(`User/RemoveList`,request)
        .then((res)=>{
          if(res.data.code == 1){
          this.$ajax.delete(`Organization/Remove/${data.OrganizationID}`)
          .then((res)=>{
            console.log(res)
            if(res.data.code == 1){
              console.log("组织机构删除成功")
              if(this.targetUserGroupId!=""){
              this.$ajax.delete(`Role/Remove/${this.targetUserGroupId}`)
              this.$ajax.post(`DeviceGroup/RemoveList/${this.deviceGroupsDelete}`)
              console.log("用户组,设备组删除成功")
              this.$emit("refresh")
              }
              else
              console.log("用户组删除失败")
              }
            })
          }
        })
        }
      else{
        this.$ajax.delete(`Organization/Remove/${data.OrganizationID}`)
          .then((res)=>{
            if(res.data.code == 1){
              console.log("组织机构删除成功")
              if(this.targetUserGroupId!=""){
              this.$ajax.delete(`Role/Remove/${this.targetUserGroupId}`)
              console.log("用户组删除成功")
              this.$emit("refresh")
              }
              else
              console.log("用户组删除失败")
              }
            })
      }
      },
      renameDeviceGroupList (event , data ,node) {
      console.log("焦点转移绑定成功")
      let text = event.target.textContent
      let children = node.parent.data.Children
      children[children.length-1].OrgName = text
      //if (text !== '新建设备分组') {
        this.$ajax.post('Organization/Create',{orgCode:data.OrganizationID.slice(-4,)+String(children.length),OrgName:text,parentID:data.OrganizationID})
        .then((res)=>{
          console.log(res)
          if(res.data.code == 1){
            let organizationID = res.data.result.organizationID
            data.OrganizationID = organizationID
            let request = {
              roleName: text,
              childData: false
            }
            this.$ajax.post('Role/Create', request)
            .then(res => {
              console.log(res)
              if (res.data.code === 1) {
                let result = res.data.result
                this.$emit("refresh")
                }
            })
        }
     })
     event.target.contentEditable = "false"
    },
      renderContent(h, { node, data, store }) {
        if(this.status=="change")
        return (
            <span class="custom-tree-node">
            <span contenteditable = {node.label=='新建组织机构'?true:false}  onblur = {() => this.renameDeviceGroupList($event,data,node)} >  {node.label} </span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }><i class = "fa fa-plus"></i></el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }><i class = "fa fa-minus"></i></el-button>
            </span>
          </span>)
        else
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>)
      }

    },

  };
</script>
<style>
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: #5bc0de;
}
<style>
<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-left: 5px;
  }
.operation{
    float:right;
}
i {
    margin:0px 5px;
}
</style>
