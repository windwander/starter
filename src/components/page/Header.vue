<template>
  <el-header height="50px" class="header animated" :class="{'header-mobile': device.isMobile}">
    <a href="#" class="logo">
      <span class="title">如亭城配智能排线系统</span>
    </a>
    <nav class="navbar">
      <NavMenu></NavMenu>
      <el-dropdown v-if="authCode" class="nav-user" trigger="hover" placement="bottom" @command="userMenu">
        <span class="label">
          用户
        </span>
        <el-dropdown-menu slot="dropdown" class="page-header-user-dropdown">
          <el-dropdown-item command="logout">
            <div class="logout">退出</div>
          </el-dropdown-item>
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
    }
  },
  components: {
    NavMenu
  },
  computed: {
    ...mapState([
      'device',
      'authCode'
    ])
  },
  methods: {
    userMenu (command) {
      this[command]()
    },
    logout () {
      sessionStorage.clear()
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 50px;
  padding: 0 10px;
  text-align: left;
  background-color: #353a4c;
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
  .nav-user {
    cursor: pointer;
    line-height: 50px;
    .label {
      display: block;
      padding-left: 30px;
      color: #ccc;
      background-image: url(/static/images/avatar.png);
      background-repeat: no-repeat;
      background-size: 24px;
      background-position: left center;
    }
  }
}
.logout {
  padding-left: 30px;
  background-image: url(/static/images/logout.png);
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: left center;
}
/* 移动样式 */
.header-mobile .logo .title {
  display: none;
}
</style>
