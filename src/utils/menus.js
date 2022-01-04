/*
 * @Author: Timber.Wang
 * @Date: 2022-01-04 15:51:44
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-04 16:13:48
 * @Description: 菜单请求工具类
 */
import router from "../router";
import store from "../store";
import {
  getRequest
} from "./api";

/**
 * 初始化菜单
 * @param {*} router 
 * @param {*} store 
 */
export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return;
  }

  // 请求菜单
  getRequest("/system/cfg/menu").then(data => {
    if (data) {
      // 格式化 routes
      let fmtRoutes = formatRoutes(data);
      // 添加到路由
      router.addRoutes(fmtRoutes);
      // 将数据存入Vuex
      store.commit('initRoutes', fmtRoutes);
    }
  })

}

/**
 * 格式化 routes
 * @param {*} routes 
 * @returns 
 */
export const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach(router => {

    let {
      path,
      component,
      name,
      iconCls,
      children,
    } = router;

    if (children && children instanceof Array) {
      // 递归调用
      children = formatRoutes(children)
    }

    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component(resolve) {
        require(['../views/' + component + '.vue'], resolve);
      }
    }

    fmtRoutes.push(fmRouter)
  });
  return fmtRoutes;
}