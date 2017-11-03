import Vue from 'vue'
import Router from 'vue-router'
import setTitle from '../utils/setTitle.js'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld,
      meta: {
        title: '首页'
      }
    }
  ]
})
router.afterEach(route => {
  let title = route.meta.title // + '-Custom-Suffix'
  setTitle(title)
})
export default router
