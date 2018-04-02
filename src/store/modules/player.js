const player = {
  state: {
    playlist: [],  // 待播放的列表
    play: false,   // 是否可以播放
  },
  mutations: {
    SET_PLAYLIST: (state, list) => {
      state.playlist = list
    },
    SET_PLAY: (state, type) => {
      state.play = type
    }
  },

  actions: {
    // 设置播放列表
    setPlaylist({ commit }, list) {
      commit('SET_PLAYLIST', list)
    },
    // 设置是否能播放
    setPlay({ commit }, type) {
      commit('SET_PLAY', type)
    }
  }
}

export default player
