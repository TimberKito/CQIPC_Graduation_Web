/*
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:07:03
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-22 01:01:17
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

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

Vue.config.productionTip = false
// 导入 ElementUI
Vue.use(ElementUI)
// 手动封装请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')