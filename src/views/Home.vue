<!--
 * @Author: Timber.Wang
 * @Date: 2021-12-22 00:08:54
 * @LastEditors: Timber.Wang
 * @LastEditTime: 2022-01-03 17:39:44
 * @Description: 
-->
<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>

        <el-aside width="200px">
          <el-menu router
                   v-for="(item,index) in this.$router.options.routes"
                   :key="index">
            <el-submenu index="1"
                        v-if="!item.hidden">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.name}}</span>
              </template>
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
  name: "Home"
}
</script>

<style>
</style>