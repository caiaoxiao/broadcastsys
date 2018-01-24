import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import phone from './modules/phone'
import dialog from './modules/dialog'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    phone,
    dialog
  },
  getters
})

export default store
