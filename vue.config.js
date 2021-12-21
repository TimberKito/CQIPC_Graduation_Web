/*
 * @Author: Timber.Wang
 * @Date: 2021-12-21 17:45:55
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2021-12-21 17:52:50
 * @Description: 
 */

let proxyObj = {}

proxyObj['/'] = {
  //websocket
  ws: false,
  //代理目标地址
  target: 'http://localhost:8081',
  //请求头host设置为target
  changeOrigin: true,
  //不重写请求地址
  pathRewrite: {
    '^/': '/'
  }

}

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}