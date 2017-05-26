// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue主文件
import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
import VueRouter from 'vue-router'
// 注册路由到vue上
Vue.use(VueRouter)
// 引入路由配置文件
import routes from './router'

// 引入ajax库，vue作者推荐
import axios from 'axios'

import store from './store/store'
// 引入入口组件
import App from './App'

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit('login', window.localStorage.getItem('token'))
}
const router = new VueRouter({
  routes
})

// 记录路由改变的次数，避免页面刷新后，右进入
var IS_ROUTER_FIRST_CHANGE = true
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      let direction = 'slide-fade'
      // 上一个页面是否是返回？
      if (from.meta.goback) {
        // 如果两个页面都有callback，比较路由深度
        if (to.meta.goback) {
          const toDepth = to.path.split('/').length
          const fromDepth = from.path.split('/').length
          direction = toDepth >= fromDepth ? 'slide-right' : 'slide-left'
        } else {
          direction = 'slide-left'
        }
      } else {
        // 下个页面是否是返回？
        direction = to.meta.goback ? 'slide-right' : 'slide-fade'
      }

      if (IS_ROUTER_FIRST_CHANGE) {
        IS_ROUTER_FIRST_CHANGE = !IS_ROUTER_FIRST_CHANGE
        direction = 'slide-fade'
      }
      router.app.pageTransition = direction
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit('logout')
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

// 注册到http上，其他组件好使用
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  render: (context) => context(App)
})
