<template>
  <el-container direction="vertical" id="app">
    <vue-progress-bar></vue-progress-bar>
    <rtHeader></rtHeader>
    <div direction="horizontal">
      <el-container direction="vertical">
        <el-main>
          <router-view></router-view>
        </el-main>
        <rtFooter></rtFooter>
      </el-container>
    </div>
  </el-container>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { Container, Main } from 'element-ui'
import 'font-awesome/css/font-awesome.css'
import rtHeader from './components/Header'
import rtFooter from './components/Footer'

Vue.use(Container)
Vue.use(Main)
export default {
  name: 'app',
  components: {
    rtHeader,
    rtFooter
  },
  computed: {
    ...mapState([
      'device'
    ])
  },
  methods: {
    ...mapMutations([
      'setDevice'
    ])
  },
  beforeMount () {
    const { body } = document
    const minDesktopWidth = 784
    const deviceChange = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        this.setDevice({
          isMobile: rect.width < minDesktopWidth
        })
      }
    }
    document.addEventListener('visibilitychange', deviceChange)
    window.addEventListener('DOMContentLoaded', deviceChange)
    window.addEventListener('resize', deviceChange)
  },
  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="scss">
blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
  margin: 0;
  padding: 0;
}
*, :after, :before {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
