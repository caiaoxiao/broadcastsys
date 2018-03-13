import Cookies from 'js-cookie'

const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // dialogShow: state => state.phone.dialogShow,
  dialogShow: state => state.dialog.dialogShow,
  phoneNum: state => state.phone.phoneNum,
  // verto.js about
  vertoHandle: state => state.verto.vertoHandle,
  group_users: state => state.verto.group_users,
  users: state => state.verto.users,
  currentLoginUser: state => state.verto.currentLoginUser,
  callQueue: state => state.verto.callQueue
}
export default getters
