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
      :render-content="renderContent"
    >
	<span class="custom-tree-node" slot-scope="{ node, data }">
	<span>{{node.label}}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            <i class = " fa fa-plus"></i>
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            <i class = " fa fa-delete"></i>
          </el-button>
        </span>
      </span>
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
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
	    <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click=""><i class = " fa fa-plus"></i></el-button>
              <el-button size="mini" type="text" on-click=""><i class = " fa fa-delete"></i></el-button>
            </span>
          </span>);
      },
      refresh () {
	console.log(this.$store.state.user_info.user.organizationID)
	console.log(this.Api)
        this.$ajax.get('https://scc.ieyeplus.com:8443/IpBc/' + 'Organization/Data/' + this.get_user_info.user.organizationID)
          .then((res) => {
            let data = res.data.result
            this.data = data
	    console.log(data)
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

    },

  };
</script>
<style scoped>
.el-highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color:#6F7882}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin-left: 5px;
  }
i {
    margin:0px 5px;
}
</style>
