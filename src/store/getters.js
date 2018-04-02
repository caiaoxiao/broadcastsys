import Cookies from 'js-cookie'

const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // dialogShow: state => state.phone.dialogShow,
  dialogShow: state => state.dialog.dialogShow,
  dialogStatu: state => state.dialog.dialogStatu,
  phoneNum: state => state.phone.phoneNum,
  // verto.js about
  vertoHandle: state => state.verto.vertoHandle,
  group_users: state => state.verto.group_users,
  deviceList: state => state.verto.deviceList,
  currentLoginUser: state => state.verto.currentLoginUser,
  callQueue: state => state.verto.callQueue,
  curCall: state=> state.verto.curCall,
  playlist: state => state.player.playlist,
  play: state => state.player.play
}
export default getters
