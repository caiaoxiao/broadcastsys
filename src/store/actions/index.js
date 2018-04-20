
import * as actions from 'store/actions/type'
import * as mutations from 'store/mutations/type'

export default {
  // 设置用户信息和登录
  [actions.SET_USER_INFO] ({commit}, userinfo) {
    commit(mutations.SET_USER_INFO, userinfo)
  },
  decrement  ({commit}) {
    commit('DECREMENT')
  },
  increment  ({commit}) {
    commit('INCREMENT')
  },
  // 页码选择
  handleCurrent ({commit}, val) {
    commit('HANDLECURRENT', val)
  },
  // 当前页数据量选择
  handleSize ({commit}, val) {
    commit('HANDLESIZE', val)
  },
  // 设置按钮权限
  setBtns ({commit}, val) {
    commit('SETBTNS', val)
  },
  // 批量选择
  batchSelect ({commit}, val) {
    commit('BATCHSELECT', val)
  },
  //  刷新页面和树
  update ({commit}, val) {
    commit('UPDATE', val)
  },
  // 单击树
  TreeChange ({commit}, val) {
    commit('TREECHANGE', val)
  },
  // 呼叫转移
  setDialogShow ({ commit }, show) {
    commit('SET_DIALOG_SHOW', show)
  },
  // 设置确定状态
  setDialogStatu ({ commit }, status) {
    commit('SET_DIALOG_STATUS', status)
  },
  // 话机操作
  CallDivert ({ commit }, obj) {
    commit('SET_PHONEDATA', obj)
  },
  // 设置播放列表
  setPlaylist ({ commit }, list) {
    commit('SET_PLAYLIST', list)
  },
  // 设置是否能播放
  setPlay ({ commit }, type) {
    commit('SET_PLAY', type)
  },
  // 初始化verto
  setVertoInit ({ commit }, handle) {
    commit('SET_VERTO_INIT', handle)
  },
  //  设置分组数据
  setGroupUsers ({ commit }, data) {
    commit('SET_GROUP_USERS', data)
  },
  // 设置所有数据
  setDeviceList ({ commit }, data) {
    commit('SET_DEVICE_LIST', data)
  },
  //  设置当前用户
  setCurrentLoginUser ({ commit }, data) {
    commit('SET_CURRENT_LOGIN_USER', data)
  },
  //  设置通话队列
  setCallQueue ({ commit }, data) {
    commit('SET_CALL_QUEUE', data)
  }

}
