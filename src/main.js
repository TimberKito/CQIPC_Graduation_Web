/*
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:07:03
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-07 22:23:01
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import 'font-awesome/css/font-awesome.css'

import {
  postRequest
} from './utils/api'
import {
  putRequest
} from './utils/api'
import {
  getRequest
} from './utils/api'
import {
  deleteRequest
} from './utils/api'
import {
  initMenu
} from './utils/menus'

Vue.config.productionTip = false
// 导入 ElementUI
Vue.use(ElementUI)
// 手动封装请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 判断用户是否登陆
  if (window.sessionStorage.getItem('tokenStr')) {
    // 初始化菜单
    initMenu(router, store);
    next();
  } else {
    // if (to.path == '/') {
    next();
    // }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')