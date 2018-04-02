import Vue from 'vue'
import Router from 'vue-router'
import store from 'store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '../utils/auth' // 验权
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

const routes = [
  {path: '/login', name: 'login', component: _import('login/index')},
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/',
    redirect: '/video',
    component: _import('home/index'),
    children: [
      {
        path: '/voiceCall',
        name: '语音通话',
        component: _import('voiceCall/index'),
      },
      {
        path: '/ipBroad',
        name: 'IP广播',
        component: _import('ipBroad/index'),
      },
      {
        path: '/video',
        name: '视频',
        component: _import('video/index'),
      },
      {
        path: '/meeting',
        name: '会议',
        component: _import('meeting/index'),
      },
      {
        path: '/broadOrder',
        name: '广播预约',
        component: _import('broadOrder/index'),
      },
      {
        path: '/systemAdmin',
        name: '系统管理',
        component: _import('systemAdmin/index'),
      },
      {
        path: '/map',
        name: '地图',
        component: _import('broadOrder/index'),
      },


    ]
  }
]

const router = new Router({
  routes,
  mode: 'hash', //default: hash ,history
})


//全局路由配置
//路由开始之前的操作
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }

  }else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }

    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done() // 结束Progress
})

export default router
