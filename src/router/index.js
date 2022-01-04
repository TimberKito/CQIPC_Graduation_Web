/*
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:30:51
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-03 17:31:07
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Test1 from '../views/Test1.vue'
import Test2 from '../views/Test2.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/home',
    name: '导航一',
    component: Home,
    children: [{
      path: '/test1',
      name: '选项1',
      component: Test1
    }, {
      path: '/test2',
      name: '选项2',
      component: Test2
    }, ]
  },
]

const router = new VueRouter({
  routes
})

export default router