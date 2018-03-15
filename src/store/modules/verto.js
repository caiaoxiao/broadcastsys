/**
 * Created by DH on 2018-3-12.
 */

const verto = {
  state: {
    vertoHandle: null,  // verto初始化
    group_users: [],
    users: [],
    currentLoginUser: [],
    callQueue: [],
  },
  mutations: {
    SET_VERTO_INIT: (state, handle) => {
      state.vertoHandle = handle
    },
    SET_GROUP_USERS: (state, data) => {
      state.group_users = data
    },
    SET_USERS: (state, data) => {
      state.users = data
    },
    SET_CURRENT_LOGIN_USER: (state, data) => {
      state.currentLoginUser = data
    },
    SET_CALL_QUEUE: (state, data) => {
      state.callQueue = data
    },

  },
  actions: {
    // 初始化verto
    setVertoInit({ commit }, handle) {
      commit('SET_VERTO_INIT', handle)
    },
    //  设置分组数据
    setGroupUsers({ commit }, data) {
      commit('SET_GROUP_USERS', data)
    },
    //  设置所有数据
    setUser({ commit }, data) {
      commit('SET_USERS', data)
    },
    //  设置当前用户
    setCurrentLoginUser({ commit }, data) {
      commit('SET_CURRENT_LOGIN_USER', data)
    },
    //  设置通话队列
    setCallQueue({ commit }, data) {
      commit('SET_CALL_QUEUE', data)
    },


  }
}

export default verto
