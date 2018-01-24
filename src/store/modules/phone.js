/** 2018-1-4
 * author: Legal High
 * function: 话机相关数据和操作
 */

const phone = {
  state: {
    // dialogShow: false,  // 呼叫转移弹窗显示或隐藏
    phoneNum: ''
  },
  mutations: {
    SET_PHONEDATA: (state, obj) => {
      // state.dialogShow = obj.type
      state.phoneNum = obj.num

    },

  },

  actions: {
    // 呼叫转移
    CallDivert({ commit }, obj) {
      commit('SET_PHONEDATA', obj)
    },

  }
}

export default phone
