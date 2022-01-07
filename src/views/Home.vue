<!--
 * @Author: Timber.Wang
 * @Date: 2021-12-22 00:08:54
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-07 22:30:38
 * @Description: 
-->
<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>

        <el-aside width="200px">
          <el-menu router
                   v-for="(item,index) in routes"
                   :key="index">
            <el-submenu :index="index+''"
                        v-if="!item.hidden">
              <template slot="title">

                <!-- 菜单图标 -->
                <i :class="item.iconCls"
                   style="color:#ffa502; margin-right:10px"></i>
                <!-- 菜单名称 -->
                <span>{{item.name}}</span>
              </template>
              <!-- 子菜单 -->
              <el-menu-item :index="children.path"
                            v-for="(children,index) in item.children"
                            :key="index">
                {{children.name}}</el-menu-item>
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
  name: "Home",
  computed: {
    routes () {
      return this.$store.state.routes;
    }
  }
}
</script>

<style>
</style>