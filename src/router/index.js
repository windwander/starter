import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import setTitle from '../utils/setTitle.js'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Overview from '@/pages/Overview'
import BasicData from '@/components/BasicData'
import Optimization from '@/components/Optimization'
import IntelligentCustomer from '@/components/Intelligent/Customer'
import IntelligentDaily from '@/components/Intelligent/Daily'
import IntelligentFinance from '@/components/Intelligent/Finance'
import IntelligentLine from '@/components/Intelligent/Line'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页'
        // progress: {
        //   func: [
        //     {call: 'color', modifier: 'temp', argument: '#ffb000'},
        //     {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        //     {call: 'location', modifier: 'temp', argument: 'bottom'},
        //     {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
        //   ]
        // }
      }
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '用户登录'
      }
    }, {
      path: '/overview',
      name: 'Overview',
      component: Overview,
      meta: {
        title: '全局概览'
      }
    }, {
      path: '/BasicData',
      name: 'BasicData',
      component: BasicData,
      meta: {
        title: '基础数据'
      }
    }, {
      path: '/Optimization',
      name: 'Optimization',
      component: Optimization,
      meta: {
        title: '智能排线'
      }
    }, {
      path: '/Intelligent',
      name: 'Intelligent',
      component: IntelligentCustomer,
      meta: {
        title: '智能排线'
      },
      children: [{
        path: 'Customer',
        name: 'Customer',
        component: IntelligentCustomer,
        meta: {
          title: '客户服务 - 智能排线'
        }
      }, {
        path: 'Daily',
        name: 'Daily',
        component: IntelligentDaily,
        meta: {
          title: '每日排线 - 智能排线'
        }
      }, {
        path: 'Finance',
        name: 'Finance',
        component: IntelligentFinance,
        meta: {
          title: '财务指标 - 智能排线'
        }
      }, {
        path: 'Line',
        name: 'Line',
        component: IntelligentLine,
        meta: {
          title: '线路优化 - 智能排线'
        }
      }]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   if (to.name !== 'Login') {
//     if (store.state) { // .authCode
//       next()
//     } else {
//       router.push({
//         name: 'Login'
//       })
//     }
//   } else {
//     next()
//   }
// })
router.afterEach(route => {
  let title = route.meta.title + ' - 如亭城配智能排线系统'
  setTitle(title)
})
export default router
