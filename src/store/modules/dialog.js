
const dialog = {
  state: {
    dialogShow: false,  // 呼叫转移弹窗显示或隐藏
    dialogStatu: null
  },
  mutations: {
    SET_DIALOG_SHOW: (state, show) => {
      state.dialogShow = show
    },
    SET_DIALOG_STATUS: (state, status) => {
      state.dialogStatu = status
    },
  },

  actions: {
    // 呼叫转移
    setDialogShow({ commit }, show) {
      commit('SET_DIALOG_SHOW', show)
    },
    // 设置确定状态
    setDialogStatu({ commit }, status) {
      commit('SET_DIALOG_STATUS', status)
    },
  }
}

export default dialog
