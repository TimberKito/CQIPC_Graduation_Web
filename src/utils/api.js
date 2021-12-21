/*
 * @Author: Timber.Wang
 * @Date: 2021-12-21 17:21:23
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-22 00:39:36
 * @Description: 拦截器
 */

import axios from 'axios'
import {
  Message
} from 'element-ui'
import router from '../router'

/**
 * 请求拦截器
 */
axios.interceptors.request.use(config => {
  // 判断 token 是否存在
  if (window.sessionStorage.getItem('tokenStr')) {
    // 设置之后请求携带 token
    config.headers['Authorization'] = window.sessionStorage.getItem('tokenStr')
  }
  return config;
}, error => {
  console.log(error);
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(success => {
  // 接口响应但业务逻辑错误
  if (success.status && success.status == 200) {
    if (success.data.code == 500 || success.data.code == 401 ||
      success.data.code == 403) {
      // 打印服务器返回错误信息
      Message.error({
        message: success.data.message
      });
      return;
    }
    if (success.data.message) {
      Message.success({
        message: success.data.message
      });
    }
  }
  return success.data;
}, error => {
  // 接口未响应
  if (error.response.code == 504 || error.response.code == 404) {
    Message.error({
      message: '服务器内部错误'
    });
  } else if (error.response.code == 403) {
    Message.error({
      message: '权限不足，请联系管理员！'
    });
  } else if (error.response.code == 401) {
    Message.error({
      message: '尚未登录，请登录'
    });
    router.replace('/');
  } else {
    // 其他错误
    if (error.response.data.message) {
      Message.error({
        message: error.response.data.message
      });
    } else {
      Message.error({
        message: '未知错误！'
      });
    }
  }
  return;
});

let base = '';

/**
 * 传送 json格式的 post请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 传送 json格式的 put请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 传送 json格式的 get请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}

/**
 * 传送 json格式的 delete请求
 * @param {*} url 
 * @param {*} params 
 * @returns 
 */
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`,
    data: params
  })
}