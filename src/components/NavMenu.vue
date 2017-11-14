<template>
  <div>
    <el-dropdown>
      <span class="nav-parent active">
        全局概览
      </span>
    </el-dropdown>
    <el-dropdown>
      <span class="nav-parent">
        智能排线<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="nav-children">
        <el-dropdown-item>每日排线</el-dropdown-item>
        <el-dropdown-item>财务指标</el-dropdown-item>
        <el-dropdown-item>客户服务</el-dropdown-item>
        <el-dropdown-item>线路优化</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown trigger="click">
      <span class="nav-parent">
        基础数据<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="nav-children">
        <el-dropdown-item class="nav-children-item">黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import Vue from 'vue'
import { Menu, MenuItem } from 'element-ui'

Vue.use(Menu)
Vue.use(MenuItem)
export default {
  data () {
    return {
      // collapseSideNav: true
    }
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>
<style>

</style>

<style lang="scss" scoped>
.nav-parent {
  display: inline-block;
  padding: 0 10px;
  line-height: 50px;
  font-size: 14px;
  color: #f0f0f0;
  cursor: pointer;
}
.active,
.nav-parent:hover {
  color: #fff;
  background-color: #334755;
}
.nav-children {
  // background-color: #091d2b;
  // .nav-children-item {
  //   color: #f0f0f0;
  // }
  // .nav-children-item:not(.is-disabled):hover {
  //   background-color: #334755;
  //   color: #fff;
  // }
}
</style>
