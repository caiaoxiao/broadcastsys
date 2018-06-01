
import * as type from 'store/mutations/type'
import {cookieStorage} from 'common/storage'
import 'assets/js/common'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  },
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  },
  HANDLECURRENT (state, val) {
    state.pageData.pageIndex = val
  },
  HANDLESIZE(state, val) {
    state.pageData.pageSize = val
  },
  SETBTNS(state, val) {
    state.btns = {}

    cookieStorage.remove('btns')
    if(val) {
      for(var i= 0;i < val.length;i++){
        state.btns[val[i].BtnName] = (val[i].IsCheck == 1)
      }
      cookieStorage.set('btns', state.btns)
    }
  },
  BATCHSELECT(state, val) {
    state.batchSelectArr = val
  },
  UPDATE(state, val) {
    state.updateState = val
    state.dialogFormVisible = false
  },
  TREECHANGE(state, val) {
    state.TreeData = val.data
    state.TreeObj = val.node
  },
  SET_DIALOG_SHOW: (state, show) => {
    state.dialogShow = show
  },
  SET_DIALOG_STATUS: (state, status) => {
    state.dialogStatu = status
  },
  SET_PHONEDATA: (state, obj) => {
    state.phoneShow = obj.type
    state.phoneNum = obj.num
  },
  SET_PLAYLIST: (state, list) => {
    state.playlist = list
  },
  SET_PLAY: (state, type) => {
    state.play = type
  },
  SET_VERTO_INIT: (state, handle) => {
    state.vertoHandle = handle
  },
  SET_GROUP_USERS: (state, data) => {
    state.group_users = data
  },
  SET_DEVICE_LIST: (state, data) => {
    state.deviceList = data || []
    cookieStorage.set('deviceList', data)
  },
  SET_CURRENT_LOGIN_USER: (state, data) => {
    state.currentLoginUser = data
  },
  SET_CALL_QUEUE: (state, data) => {
    state.callQueue = data
  },
  SET_WHETHER_PLAY_ANOTHER_SONG: (state, data) => {
    state.whetherPlayAnotherSong = data
  },
  SET_CONF_LEFT: (state, data) => {
    state.confLeft = data
  },
  SET_CONF_ALARM: (state, data) => {
    state.confAlarm = data
  },
  SET_CONF_IP_BOARD: (state, data) => {
    state.confIpBoard = data
  },
  SET_CONF_MEETING: (state, data) => {
    state.confMeeting = data
  },
  SET_SELECTED_ALARM: (state, data) => {
    state.selectedAlarm = data
  },
  SET_USER_GROUP: (state, data) => {
    state.userGroup = data
  },
}
