<template>
  <!--新增用户-->
  <div class="popUp">
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
        <h5>
          <i class="fa fa-address-card"></i>用户组
        </h5>
        <ol class="menuItem clearfix">
          <li :class="{selected: item.selected}" v-for='item in groupList' :key='item.roleID' @click='selectUserGroup(item)'>{{item.roleName}}
          </li>

        </ol>
      </div>
    </div>
    <div class="btnDiv">
      <button type="button" class="btn btn-sm btn-info" @click="submitFrom(self, modolType, 'User/Create', 'User/Edit', formData,1)">确定</button>
      <button type="button" class="btn btn-sm btn-default" @click="close">取消</button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    targetMenu: {
      type: Object,
      required: true
    },
    modolType: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      self: this,
      formData: {
        userName: '',
        password: '',
        organizationID: '',
        userRoles: []
      },
      groupList: [],
      rules: {
        userName: [{ required: true, message: '用户名不能为空' }, { validator: this.defenseSQL }],
        userPassword: [{ required: true, message: '密码不能为空' }, { validator: this.defenseSQL }],
      }
    }
  },
  created () {
    this.initData()
    let documentHeight = document.documentElement.clientHeight
    $('.popUp').css('top', documentHeight * 0.3 + 'px')

    if (this.modolType === 0) { // 如果为新增，拿到当前的组织机构ID
      this.formData.OrganizationID = this.targetMenu.OrganizationID
    } else { // 如果为编辑，拿到当前的用户的userId
      this.$ajax.get(`User/Detail/${this.targetMenu.userId}`)
        .then((res) => {
          if (res.data.code === 1) {
            let result = res.data.result
            this.formData = result

            this.groupList.forEach((g) => {
              if (g.roleID === result.userRoles[0].roleID) {
                g.selected = true
              }
            })
          }
        })
    }
  },
  methods: {
    initData () {
      this.$ajax.post(`Role/List`)
        .then((res) => {
          if (res.data.code === 1) {
            let result = res.data.result
            result.forEach((r) => {
              r.selected = false
            })
            this.groupList = result
          }
        })
    },
    selectUserGroup (item) {
      if (!item.selected) {
        this.formData.userRoles = [item]
      }
      item.selected = !item.selected
    },
    close () {
      this.$emit('close')
    },
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>
