// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//导入状态管理器
import store from 'store'
import ElementUI from 'element-ui'
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'https://scc.ieyeplus.com:8082'
Vue.prototype.$ajax = axios
// 导入JQ
import $ from 'jquery'
// 引入 bootstrap
import 'assets/css/bootstrap.css'
// 引入 font-awesome
import 'assets/css/font-awesome.css'
// 引入公用 css
import 'assets/css/default.css'
// 引入播放条样式
import 'assets/css/loaderskit.css'
// 引入公用 js
import 'utils/public'
// 1.滚动条
import 'assets/js/jquery.slimscroll.min'
// 2.动态高度
import 'assets/js/effect.js'
// 3.小球飞入动画
import 'assets/js/addList/addList'
import 'assets/js/addList/requestAnimationFrame'
import 'assets/js/addList/jquery_002'
// 4.引入滚动条插件
import BScroll from 'better-scroll'
// 5.引入verto相关js
import 'jquery-json'
import 'verto/src/jquery.verto.js'
import 'verto/src/jquery.FSRTC.js'
import 'verto/src/jquery.jsonrpcclient.js'
import 'utils/xcti'


Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
