<template>
  <div class="content" >
    <div class="groupList">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>设备组列表
        <p @click="addgroup()"><i class="fa fa-plus" aria-hidden="true"></i></p>
      </div>
      <el-form :model="formData" ref="formData">
        <input type="text" class="form-control form-lighter" placeholder="快速查找组"/>
      </el-form>
        <ul id="height01" class="devGroup">
          <li v-for="(item , index) in groupLength">
            <p v-model="groupName">
              <span v-if="flag" v-model="formData.initialName">设备组{{item.TempName}}</span>
              <input v-else class="form-control " v-model="formData.TempName" type="text"/>
              <span v-if="item.action==1" v-model="formData.TempName">{{item.TempName}}</span>
              <input v-else-if="item.action==0" class="form-control " v-model="formData.TempName" type="text"/>
            </p>
            <ul>
              <li @click="submitFrom(self, formData.pid,'TempGroup/Create','TempGroup/Edit', formData)"><i class="fa fa-check-circle"></i></li>
              <li @click="edit(item)"><i class="fa fa-edit"></i></li>
              <li @click="deleteItems(self, 'TempGroup/Remove', props.row)"><i class="fa fa-times"></i></li>
            </ul>
          </li>
        </ul>
    </div>
    <singleDevice></singleDevice>
    <!--<add v-if="editShow" @close="addgroup"></add>-->
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/deviceGroup'
  import singleDevice from './deviceList'
  export default {
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        dialogFormVisible: 'dialogFormVisible',
        pageData: 'pageData',
        deviceList: 'deviceList',         // 所有设备
        selectDevice:[]
      })
    },
    data(){
      return {
        editShow: false,    //编辑框显示或隐藏
        dataAll: [],
        planData: [],
        //请求时的loading效果
        loading: true,
        self: this,
        flag:true,
        formData: {
          pid:0,
          initialName:'',
          TempName: '',
          UserID: '',
          UserName:'',
          TempGroupID:''
        },
        groupLength: [{ text: ""}],
        groupName: "新建组",
        groupArry: [],
        p: false,
        nowIndex: -100,
        isShow: false
      }
    },
    watch: {
      'pageData.pageSize': function () {
        this.refresh()
      },
      'pageData.pageIndex': function () {
        this.refresh()
      },
      'updateState': function () {
        this.toLeadShow = false
        if (this.updateState === 1) {
          this.refresh()
        } else if (this.updateState === 2) {
          this.refresh()
          this.$refs.tree.refresh(this.targetMenu)
        }
        this.$store.state.updateState = 0
      },
    },
    components: {
      singleDevice,
    },
    created() {
      this.formData.UserID = this.get_user_info.user.UserID;
      this.formData.UserName = this.get_user_info.user.UserName;
      this.refresh()
    },
    methods: {
      //获取数据
      refresh(){
        var request = {
          pageSize: this.pageData.pageSize,
          pageIndex: this.pageData.pageIndex,
        }
        this.$AjaxPost("TempGroup/List", request, function (ret) {
          if (ret.code == 1) {
            let result = ret.result
            for(let item of result){
                item.action=1;
            }
            this.pageData.total = ret.total
            this.groupLength = result
            this.formData.TempName = this.groupLength.TempName
            this.loading = false
          }
        }.bind(this));
        this.$ajax.post('Plan/List')
          .then(res => {
            if(res.data.code == 1) {
              this.planData = res.data.result
              for(let i in this.planData){
                this.formData.TempGroupID = this.planData[i].PlanID;
              }
            }
          })
      },
      // 新增设备组
      addgroup() {
          debugger
        var i=2;
        //this.groupLength.unshift(i++);
        this.editShow =  !this.editShow

      },
      //可编辑状态
      edit(item){
        item.action=0;
        this.formData.pid = 1;
        this.refresh()

        this.flag=false;
        /*var request = {
          TempGroupID:this.formData.TempGroupID,
          TempName: this.formData.initialName,
          UserID: this.formData.UserID,
          UserName: this.formData.UserName
        }
        this.$AjaxPut("TempGroup/Edit",request , function (ret) {
          if (ret.code == 1) {
            let result = ret.result
            this.groupLength = result
            this.loading = false
          }
        }.bind(this));
        this.refresh()*/
      },
      //输入并修改
      input(){
        this.flag=true;
        this.formData.pid = 1;
      },
      changeName(n) {
        this.input=false;
        if(this.span=true){
          this.input=false;
          this.groupLength.push({
            text: ""
          })
        }else{
          this.input=true;
        }
      },
      groupDelete(n) {
        this.isShow=false;
        this.groupLength.splice(n,1);
      },
      displayPop(x) {
        this.nowIndex=x;
        this.isShow=true;
      }
    }
  }
</script>



