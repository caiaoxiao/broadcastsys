<template>
  <div class="groupList">
    <div class="menuType">
      <i class="fa fa-list-ul" aria-hidden="true"></i>组织机构
    </div>
    <div class="dept">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        :default-expanded-keys="defaultExpanded"
        node-key="OrganizationID"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
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
      refresh() {
        let data;
        this.$ajax.get(this.Api + 'Organization/Data/' + this.$store.state.user_info.user.OrganizationID)
          .then((res) => {
            data = res.data.result
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
          debugger
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
