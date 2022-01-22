<!--
 * @Author: Timber.Wang
 * @Date: 2021-12-22 00:08:54
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-22 17:48:29
 * @Description: 
-->
<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <!-- 标题 -->
        <div class="title">企业办公信息化管理系统</div>
        <!-- 用户头像区域 -->
        <el-dropdown class="userInfo" @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i>
              <img :src="userInfo.userFace" />
            </i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router v-for="(item,index) in routes" :key="index">
            <el-submenu :index="index+''" v-if="!item.hidden">
              <template slot="title">
                <!-- 菜单图标 -->
                <i :class="item.iconCls" style="color:#ffa502; margin-right:10px"></i>
                <!-- 菜单名称 -->
                <span>{{item.name}}</span>
              </template>
              <!-- 子菜单 -->
              <el-menu-item :index="children.path" v-for="(children,index) in item.children" :key="index">{{children.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 用户信息
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes
    }
  },
  methods: {
    // 头部用户信息处回调函数
    handleCommand(command) {
      // 点击注销登陆
      if (command == 'logout') {
        this.$confirm('您是否想要注销登陆？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 调用注销登陆接口
            this.postRequest('/logout')
            // 清空用户信息
            window.sessionStorage.removeItem('tokenStr')
            window.sessionStorage.removeItem('userInfo')
            // 清空菜单
            this.$store.commit('iniRoutes', [])
            // 路由到登陆页
            this.$router.replace('/')
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    }
  }
}
</script>

<style>
.homeHeader {
  background-color: #e67e22;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .title {
  font-size: 25px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: white;
}
.el-dropdown-link img {
  width: 45px;
  height: 45px;
  border-radius: 24px;
  margin-left: 8px;
}
</style>