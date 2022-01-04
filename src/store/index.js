/*
 * @Author: Timber.Wang
 * @Date: 2022-01-04 15:44:08
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-04 15:49:05
 * @Description: 
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routes: []
  },

  mutations: {
    initRoutes(state, data) {
      state.routes = data;
    }
  },

  actions: {

  },
})