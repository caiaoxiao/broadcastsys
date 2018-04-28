<template>
  <div>
    <div class="singleDevice ">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>已有设备
        <p @click="open"><i class="fa fa-plus" aria-hidden="true"></i>添加设备</p>
      </div>
      <div class="removeDev">
        <button class="btn btn-sm btn-danger" type="button" @click="deleteAll()">全部移除</button>
      </div>
      <div class="musicList" id="end">
        <div id="groupMember" class="aa">
          <div class="singleFlies selectDelate" v-for="device in selectDevice" @click="deleteDevice(device)">
            {{device.userID}}
          </div>
        </div>
      </div>
      <confirm-dialog v-if="dialogShow" @submit="confirm">
        <p slot="content">确定要删除设备吗？</p>
      </confirm-dialog>
    </div>
    <div class="allDevice ">
      <div class="menuType">
        <i class="fa fa-list-ul" aria-hidden="true"></i>设备列表
        <p @click="selectAll(1)">全部添加</p>
      </div>
      <form style="padding:5px 10px">
        <input type="text" class="form-control form-lighter" placeholder="快速查找设备" />
      </form>
      <div class="musicList" id="height02">
        <div id="SelectedMembers" class="aa">
          <div class="singleFlies"
               :class="device.selected ? 'selected' : ''"
               v-for="device in deviceList"
               @click="selectItem(device)">{{device.userID}}
          </div>
        </div>

      </div>
      <div class="sidder" @click="Devhidden();"><i class="fa fa-2x fa-angle-double-right"></i><span>收起</span></div>
    </div>
  </div>
</template>
<script>
  import { mapGetters,mapActions } from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import {toolTip} from 'components'
  import {getHeight} from 'utils/height'
  import {getHeights,itemClick} from 'utils/page/deviceGroup'
  import {isArray,isObject,isString} from 'utils/tool'
  import { confirmDialog } from 'components'

  export default {
    data() {
      return {
        isSelectAll: false, // 是否全选
        dialogShow: false,
        selectDevice:[],
      }
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO,
        pageData: 'pageData',
        vertoHandle:'vertoHandle',
        deviceList: 'deviceList',    // 所有设备
      })
    },

    created() {
      this.$nextTick(function() {
        getHeight()
        getHeights()
        this.refresh()
      })
    },
    components: {
      confirmDialog
    },

    methods: {
      refresh() {
          debugger
        this.deviceList
      },
      Devhidden() {
        $(".singleDevice").removeClass("moveLeftMiddle").addClass("moveRightMiddle");
        $(".allDevice").removeClass("moveLeftDev").addClass("moveRightDev");
      },
      selectItem(device) {
        if(!device.selected) {
          this.selectDevice.push(device)
        }else {
          this.deleteDevice(device)
        }
        device.selected = !device.selected

      },
      selectAll(type) {
        if(type == 1) {
          if(!this.isSelectAll) {
            this.deviceList.forEach(function(d,i){
              d.selected = true
            })
            this.selectDevice = this.deviceList
          }else {
            this.deviceList.forEach(function(d,i){
              d.selected = false
            })
          }
          this.isSelectAll = !this.isSelectAll
        }
      },

      deleteDevice(device) {
        this.selectDevice.forEach(function(s,i) {
          if(device.userID == s.userID) {

            this.selectDevice.splice(i,1)
          }
        }.bind(this))
      },
      deleteAll() {
        this.selectDevice = []
      },
      fsAPI(cmd, arg, success_cb, failed_cb) {
        this.vertoHandle.sendMethod("jsapi", {
          command: "fsapi",
          data: {
            cmd: cmd,
            arg: arg
          },
        }, success_cb, failed_cb);
      },
      open() {
        debugger
        this.deviceList
        $(".singleDevice").removeClass("moveRightMiddle").addClass("moveLeftMiddle");
        $(".allDevice").removeClass("moveRightDev").addClass("moveLeftDev");
      },
      removeAll() {
        $('#end').html('');
      },
      confirm(){
        let ids = []
        this.selectPlan.forEach(function(s, i) {
          ids.push(s.PlanID)
        })
        this.$ajax.post('TempGroup/RemoveList', ids)
          .then(res => {
            if(res.data.code == 1) {
              this.$store.dispatch('setDialogShow', false)
              this.refresh()
            }else {

            }
          })
      }
    }
  }
</script>
