import Vue from 'vue'
import Router from 'vue-router'
import setTitle from '../utils/setTitle.js'
import Overview from '@/components/Overview'
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
      component: Overview,
      meta: {
        title: '首页',
        progress: {
          func: [
            {call: 'color', modifier: 'temp', argument: '#ffb000'},
            {call: 'fail', modifier: 'temp', argument: '#6e0000'},
            {call: 'location', modifier: 'temp', argument: 'bottom'},
            {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
          ]
        }
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
router.afterEach(route => {
  let title = route.meta.title
  setTitle(title)
})
export default router
