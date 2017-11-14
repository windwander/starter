<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary">主要按钮</el-button>
    <!-- <div style="height: 300px">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center"></el-amap>
    </div>
    <div>
      <chart :options="polar"></chart>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'element-ui'
import VueAMap from 'vue-amap'
import ECharts from 'vue-echarts/components/ECharts.vue'

import 'echarts/lib/component/polar'
import 'echarts/lib/chart/line'

Vue.use(Button)
Vue.use(VueAMap)
Vue.component('chart', ECharts)

VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'd417e0d756c8e3080b0198b0f400fd6a',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

export default {
  name: 'HelloWorld',
  data () {
    let data = []
    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      },
      msg: 'Welcome to Your Vue.js App',
      zoom: 6,
      center: [118, 32]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
