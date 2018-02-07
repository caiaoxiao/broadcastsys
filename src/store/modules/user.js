import { getToken, setToken, removeToken } from '../../utils/auth'

const user = {
  state: {
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      debugger
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      setToken('222222')
      commit('SET_TOKEN', '222222')


    },
    LogOut({ commit, state }) {
      debugger
      removeToken()
    },
  }
}

export default user
