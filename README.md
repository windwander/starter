# paixian

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目构成

1. 基础框架：Vue.js official Webpack [template](https://vuejs-templates.github.io/webpack/)
    ++ Vue build standalone
    ++ vue-router
    ++ ESLint preset Standard

2. 状态管理：[vuex](https://vuex.vuejs.org/)

3. 桌面端UI组件库：[Element](https://github.com/ElemeFE/element)
    ++ 按需引入, babel-plugin-component
    ++ 自定义主题, sass-loader + node-sass

4. 高德地图组件：[vue-amap](https://github.com/ElemeFE/vue-amap/)

5. 百度ECharts组件：[vue-echarts](https://github.com/Justineo/vue-echarts/)

6. 异步数据：[axios](https://github.com/axios/axios)

## 开发时的配置

1. proxy转发

在文件config/index.js中：

``` javascript
proxyTable: {
  '/api': {
    target: 'http://cn.bing.com/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}
```
