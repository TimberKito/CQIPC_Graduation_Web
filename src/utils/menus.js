/*
 * @Author: Timber.Wang
 * @Date: 2022-01-04 15:51:44
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-07 22:32:12
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
  // 判断请求中有无数据
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
        if (component.startsWith('Home')) {
          require(['../views/' + component + '.vue'], resolve);
        } else

        if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve);
        } else if (component.startsWith('Per')) {
          require(['../views/per/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sal')) {
          require(['../views/sal/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component + '.vue'], resolve);
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component + '.vue'], resolve);
        }
      }
    }

    fmtRoutes.push(fmRouter)
  });
  return fmtRoutes;
}