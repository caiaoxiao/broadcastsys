import Cookies from 'js-cookie'

const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  // dialogShow: state => state.phone.dialogShow,
  dialogShow: state => state.dialog.dialogShow,
  phoneNum: state => state.phone.phoneNum
}
export default getters
