/*
 * @Author: Timber.Wang
 * @Date: 2021-12-09 21:30:51
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-22 00:11:03
 * @Description: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router