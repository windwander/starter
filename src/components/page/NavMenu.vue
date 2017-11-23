<template>
  <el-menu
    class="nav-menu"
    mode="horizontal"
    :default-active="$route.path"
    @select="handleSelect"
    router
    background-color="#353a4c"
    text-color="#fff"
    active-text-color="#1DC4F4">
    <template v-for="item in navMenus">
      <rtSubMenu :items="item" :key="item.url"></rtSubMenu>
    </template>
  </el-menu>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Menu, MenuItem } from 'element-ui'
import rtSubMenu from './SubMenu'

Vue.use(Menu)
Vue.use(MenuItem)
export default {
  data () {
    return {
    }
  },
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  components: {
    rtSubMenu
  },
  computed: {
    ...mapState([
      'navMenus'
    ])
  },
  methods: {
    handleSelect (index, indexPath) {
      console.log(index)
      console.log(indexPath)
    }
  }
}
</script>
