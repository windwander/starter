// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'
import ElementUI from 'element-ui'
import VueAMap from 'vue-amap'
import store from './store'
import router from './router'
import './styles/element-variables.scss'

Vue.config.productionTip = false

Vue.use(VueProgressBar, {
  color: '#1DC4F4',
  failedColor: '#874b4b',
  thickness: '3px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

Vue.use(ElementUI)

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  // 高德的key
  key: '49368279e2c8940219e4c54acd3081e8',
  // 插件集合
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'AMap.CircleEditor'
  ],
  // 引入高德 UI 组件库
  uiVersion: '1.0' // '1.0.11'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
