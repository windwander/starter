<template>
  <el-header height="50px" class="header animated" :class="{'header-mobile': device.isMobile}">
    <a href="#" class="logo">
      <span class="title">如亭城配智能排线系统</span>
    </a>
    <nav class="navbar">
      <NavMenu></NavMenu>
      <el-dropdown class="nav-user">
        <span>
          用户<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </nav>
  </el-header>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Header, Dropdown, DropdownMenu } from 'element-ui'
import NavMenu from './NavMenu'

Vue.use(Header)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
export default {
  data () {
    return {
      // collapseSideNav: true
    }
  },
  components: {
    NavMenu
  },
  computed: {
    ...mapState([
      'device'
    ])
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 50px;
  padding: 0 10px;
  text-align: left;
  background-color: #091d2b;
  box-shadow: 0 2px 3px rgba(18, 18, 18, 0.1), 0 0 0 1px rgba(18, 18, 18, 0.1);
}
.logo {
  margin-left: 20px;
  font-size: 20px;
  text-decoration: none;
  padding-left: 53px;
  line-height: 50px;
  color: #fff;
  background-image: url(/static/images/logo.png);
  background-repeat: no-repeat;
  background-size: 43px 28px;
  background-position: left center;
  .title {
    display: block;
    padding-right: 20px;
  }
}
.navbar {
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0 20px;
  .sidebar-toggle {
    display: inline-block;
    color: #fff;
    padding: 15px;
  }
  .sidebar-toggle:hover {
    background-color: #334755;
  }
}
// .side-nav-collapse {
//   .logo {
//     margin-left: 0;
//     .title {
//       display: none;
//     }
//   }
// }
.nav-user {
  color: #f0f0f0;
  cursor: pointer;
  line-height: 50px;
  .nav-user-btn {
  }
}
/* 移动样式 */
.header-mobile .logo .title {
  display: none;
}
</style>

