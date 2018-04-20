<template>
  <div :visible.sync="dialogFormVisible">
    <div class="popUpbig"><!--新增用户-->
      <div class="groupName"><i class="fa fa-user-plus" ></i>新增用户</div>
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

          <ul class="dept">
            <li><i class="fa fa-caret-right"></i><a>一级机构</a>
              <ul>
                <li><i class="fa fa-caret-down"></i><a class="selected">二级机构</a>
                  <ul>
                    <li><a>三级机构</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a>一级机构</a></li>
          </ul>
        </div>
        <div class="orgMember">

          <ul class="userList">
            <li class="selected"><i class="fa fa-user" ></i>马大哈<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>马中哈<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>马小哈<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>admin<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>cools<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>嗯哼<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>吴亦凡<span class="fa fa-check-circle"></span></li>
            <li><i class="fa fa-user" ></i>嘻哈哥<span class="fa fa-check-circle"></span></li>
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
        <button type="submit" class="btn btn-sm btn-default">取消</button>
      </div>
    </div>
    <!--用户信息修改-->
    <div class="popUp">
      <div class="popContent">
        <el-form class="form-horizontal" ref="form" :model="result">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-sm-4 control-label">用户名</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control">
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="col-sm-4 control-label">密码</label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" >
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
        <button type="submit" class="btn btn-sm btn-info">确定</button>
        <button type="submit" class="btn btn-sm btn-default" @click="close">取消</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {GET_USER_INFO} from 'store/getters/type'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
      })
    },
    data(){
      return {
        result: {},
      }
    },

    methods: {
      close(type) {
        this.$emit('close', type);
      },
    }
  };
</script>
