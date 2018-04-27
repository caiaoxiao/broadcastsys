
import * as type from 'store/getters/type'

export default {
  //获取用户信息
  [type.GET_USER_INFO]: state => {
    return state.user_info
  },
  LoginId: state => {
    state.LoginId = state.user_info.user.UserID
    return state.LoginId
  },
  getCount: state => {
    return state.count
  },
  pageData: state => {
    return state.pageData
  },
  btns: state => {
    return state.btns
  },
  batchSelectArr: state => {
    return state.batchSelectArr
  },
  dialogFormVisible: state => {
    return state.dialogFormVisible
  },
  updateState: state => {
    return state.updateState
  },
  TreeData: state => {
    return state.TreeData
  },
  TreeObj: state => {
    return state.TreeObj
  },
  phoneShow: state => {
    return state.phoneShow
  },
  name: state => {
    return state.user.name
  },
  dialogShow: state => {
    return state.dialogShow
  },
  dialogStatu: state => {
    return state.dialog.dialogStatu
  },
  phoneNum: state => {
    return state.phoneNum
  },
  // verto.js about
  vertoHandle: state => {
    return state.vertoHandle
  },
  group_users: state => {
    return state.group_users
  },
  deviceList: state => {
    return state.deviceList
  },
  currentLoginUser: state => {
    return state.currentLoginUser
  },
  callQueue: state => {
    return state.callQueue
  },
  curCall: state => {
    return state.curCall
  },
  playlist: state => {
    return state.playlist
  },
  play: state => {
    return state.play
  },
  use_livearray: state => {
    return state.use_livearray
  }
}
