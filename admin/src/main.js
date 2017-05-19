// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue主文件
import Vue from 'vue'
// 引入vue路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 引入入口组件
import App from './App'
// 引入路由配置文件
import routes from './router'
// 引入ajax库，vue作者推荐
import axios from 'axios'

// 设置默认配置
axios.defaults.baseURL = 'http://localhost:3000'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('request interceptor')
  return config
}, function (error) {
  // Do something with request error
  console.log('request interceptor', error)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  console.log('response interceptor')
  return response
}, function (error) {
  // Do something with response error
  console.log('response interceptor', error)
  return Promise.reject(error)
})
// 注册到http上，其他组件好使用
Vue.prototype.$http = axios
// 使用配置文件规则
const router = new VueRouter({
  routes
})
// 记录路由改变的次数，避免页面刷新后，右进入
var IS_ROUTER_FIRST_CHANGE = true
router.beforeEach((to, from, next) => {
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
})
/*axios.create({
 baseURL: 'http://localhost:3000/api/',
 timeout: 1000
 })*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (context) => context(App)
})
