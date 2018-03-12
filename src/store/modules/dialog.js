
const dialog = {
  state: {
    dialogShow: false,  // 呼叫转移弹窗显示或隐藏
  },
  mutations: {
    SET_DIALOG_SHOW: (state, show) => {
      state.dialogShow = show
    },
  },

  actions: {
    // 呼叫转移
    setDialogShow({ commit }, show) {
      commit('SET_DIALOG_SHOW', show)
    },

  }
}

export default dialog
