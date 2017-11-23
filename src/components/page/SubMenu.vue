<template>
  <el-submenu
    v-if="items.childs && items.childs.length"
    :index="items.url"
    class="overwrite-nav-menu-sub">
    <template slot="title">
      <i :class="items.icon"></i>
      <span>{{items.name}}</span>
    </template>
    <template v-for="child in items.childs">
      <rtSubMenu
        v-if="child.childs && child.childs.length
      "
        :items="child"
        :key="child.url">
      </rtSubMenu>
      <el-menu-item
        v-else
        :index="child.url"
        :key="child.url">
      <i :class="child.icon"></i>
      <span>{{child.name}}</span>
    </el-menu-item>
    </template>
  </el-submenu>
  <el-menu-item
    v-else
    :index="items.url"
    class="nav-menu-sub">
    <i :class="items.icon"></i>
    <span>{{items.name}}</span>
  </el-menu-item>
</template>
<script>
import Vue from 'vue'
import { Menu, Submenu } from 'element-ui'
import rtSubMenu from './SubMenu'

Vue.use(Menu)
Vue.use(Submenu)
export default {
  name: 'SubMenu',
  props: {
    items: {
      type: Object
    }
  },
  components: {
    rtSubMenu
  }
}
</script>
<style>
.overwrite-nav-menu-sub .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}
.overwrite-nav-menu-sub.el-submenu > .el-menu {
  top: 52px !important;
}
</style>
<style lang="scss" scoped>
.nav-menu-sub {
  height: 50px;
  line-height: 50px;
}
</style>

