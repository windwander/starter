<template>
  <div class="map-wrap">
    <el-amap vid="amapOverview" :center="center" :zoom="zoom" :events="events" resizeEnable class="map"></el-amap>
    <div class="title-box">
      <div class="title">本月总物流成本</div>
      <div class="cost">&#165;{{overviewCost.totalCost && overviewCost.totalCost.toFixed(2)}}（万元）</div>
      <div class="change" :class="[overviewCost.up > 0 ? 'up' : 'down']">较上月：{{overviewCost.up}}%</div>
    </div>
    <div class="label-box">
      <div class="title">成本</div>
      <div class="bar"></div>
      <div class="value">
        <span class="high">高</span>
        <span class="low">低</span>
      </div>
    </div>
    <div id="OverviewPageMapMarker" v-show="hoverAdcode">
      <div v-for="city in overviewCost.cityCostDtoList" :key="city.cityAdcode" :style="{backgroundColor: colors[city.cityAdcode]}" v-if="city.cityAdcode.substring(0,3) === hoverAdcode.substring(0,3)" class="label">
        <div class="name">{{city.cityName}}</div>
        <div class="cost">
          <span class="number">{{city.totalCost.toFixed(2)}}</span> 万元
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      overviewCost: {},
      hoverAdcode: '',
      center: [104.114129, 37.550339],
      zoom: 4,
      colors: {},
      // districtExplorer: {},
      // amapManager: new VueAMap.AMapManager(),
      events: {
        init (map) {
          window.overviewCostMap = map
          map.setMapStyle('amap://styles/7d67486c75f33bd2a23644e276b3caed') // 自定义地图样式
          AMapUI.loadUI(['geo/DistrictExplorer'], function (DistrictExplorer) {
            let districtExplorer = new DistrictExplorer({
              eventSupport: true,
              map: map
            })

            window.overviewCostDistrictExplorer = districtExplorer
          })
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'getOverviewCost'
    ]),
    calcAllColors () {
      const z = this
      let cities = z.overviewCost.cityCostDtoList
      let max = cities[0].totalCost
      let min = cities[0].totalCost
      cities.map(function (city) {
        if (city.totalCost > max) {
          max = city.totalCost
        }
        if (city.totalCost < min) {
          min = city.totalCost
        }
      })
      cities.map(function (city) {
        z.colors[city.cityAdcode] = z.calcColor(max, min, city.totalCost)
      })
    },
    calcColor (high, low, current) {
      let total = high - low
      let percentage = 0
      if (total > 0) {
        percentage = parseInt((current - low) / total)
      } else {
        percentage = 50
      }
      let red = 0
      let green = 0
      let blue = 0
      if (percentage < 32) {
        red = 250
        green = parseInt(96 + (percentage / 32) * (139 - 96))
        blue = 96
      } else if (percentage < 64) {
        red = 250
        green = parseInt(139 + ((percentage - 32) / 32) * (245 - 139))
        blue = 96
      } else {
        red = parseInt(250 - ((percentage - 64) / 36) * (250 - 201))
        green = parseInt(245 + ((percentage - 64) / 36) * (250 - 245))
        blue = 96
      }
      return 'rgb(' + red + ',' + green + ',' + blue + ')'
    },
    renderAreaNode (districtExplorer, areaNode) {
      districtExplorer.renderParentFeature(areaNode, {
        cursor: 'default',
        bubble: true,
        strokeColor: '#eee',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: this.colors[areaNode.adcode],
        fillOpacity: 1
      })
    },
    setMapMarker () {
      const z = this
      let districtExplorer = window.overviewCostDistrictExplorer
      let map = window.overviewCostMap

      let tipMarker = new AMap.Marker({
        bubble: true,
        content: document.getElementById('OverviewPageMapMarker')
      })
      districtExplorer.on('featureMouseout featureMouseover', function (e, feature) {
        console.log(feature.properties)
        var isHover = e.type === 'featureMouseover'
        if (!isHover) {
          z.hoverAdcode = ''
          tipMarker.setMap(null)
          return
        }
        tipMarker.setMap(map)
        tipMarker.setPosition(e.originalEvent.lnglat)
        z.hoverAdcode = feature.properties.adcode.toString()
      })
      districtExplorer.on('featureMousemove', function (e, feature) {
        tipMarker.setPosition(e.originalEvent.lnglat)
      })
      districtExplorer.on('featureClick', function (e, feature) {
        console.log('点击: ' + feature.properties.name)
        console.log(feature.properties.adcode)
      })
      districtExplorer.on('outsideClick', function (e) {
        console.log('区域外点击')
      })
    },
    setMapData (cities) {
      const z = this
      let adcodes = cities.map(function (city) {
        return city.cityAdcode
      })
      let districtExplorer = window.overviewCostDistrictExplorer
      let map = window.overviewCostMap

      districtExplorer.loadMultiAreaNodes(adcodes, function (error, areaNodes) {
        if (error) {
          console.error(error)
          return
        }
        // 清除已有的绘制内容
        districtExplorer.clearFeaturePolygons()
        for (var i = 0, len = areaNodes.length; i < len; i++) {
          z.renderAreaNode(districtExplorer, areaNodes[i])
        }
        // 设置用于位置归属识别的areaNode列表
        districtExplorer.setAreaNodesForLocating(areaNodes)

        // 更新地图视野
        map.setFitView(districtExplorer.getAllFeaturePolygons())
      })
    }
  },
  mounted () {
    const z = this
    z.getOverviewCost().then(function (res) {
      z.overviewCost = res.data
      setTimeout(function () {
        z.calcAllColors()
        z.setMapMarker()
        z.setMapData(res.data.cityCostDtoList)
      }, 2000)
    })
  }
}
</script>
<style lang="scss" scoped>
.map-wrap {
  position: relative;
  .map {
    height: calc(100vh - 100px);
    min-height: 492px;
  }
  .title-box {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 20px;
    text-align: left;
    line-height: 1.5;
    background-color: #fff;
    z-index: 200;
    .title {
      font-size: 18px;
      color: #000;
    }
    .cost {
      font-size: 16px;
      color: #FCA864;
    }
    .change {
      font-size: 14px;
    }
    .change.up {
      color: #63bb6e;
    }
    .change.down {
      color: #ee4520;
    }
  }
  .label-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 160px;
    padding: 10px 20px;
    text-align: left;
    font-size: 14px;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    z-index: 200;
    .bar {
      height: 10px;
      background: linear-gradient(to right, #fa6060 0%, #fa8c61 32%, #faf561 64%, #c9fa60 100%);
    }
    .value {
      .high {
        float: left;
      }
      .low {
        float: right;
      }
    }
  }
}
</style>
<style lang="scss">
#OverviewPage .map * {
  box-sizing: content-box;
}
#OverviewPage .map .amap-logo,
#OverviewPage .map .amap-copyright {
  margin-left: -1000px;
}
#OverviewPageMapMarker {
  .label {
    margin: 30px 0 0 30px;
    padding: 5px;
    font-size: 14px;
    box-shadow: 0 0 3px 0px #666;
    border-radius: 3px;
    .name {
      min-width: 5em;
    }
    .cost {
      .number {
        font-size: 18px;
      }
    }
  }
}
</style>

