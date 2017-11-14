<template>
  <el-aside class="side-nav animated" :width="collapseSideNav ? '64px' : '240px'">
    <el-scrollbar tag="div" class="side-nav-scrollbar">
      <el-menu default-active="1-4-1" class="side-nav-menu" mode="vertical" :collapse="collapseSideNav">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Aside, Menu, MenuItem, Scrollbar } from 'element-ui'

Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Scrollbar)
export default {
  data () {
    return {
      // collapseSideNav: true
    }
  },
  computed: {
    ...mapState([
      'collapseSideNav'
    ])
  }
}
</script>
<style lang="scss" scoped>
.side-nav {
  text-align: left;
  .side-nav-scrollbar {
    .side-nav-menu {
      height: calc(100vh - 50px);
    }
  }
}
</style>
