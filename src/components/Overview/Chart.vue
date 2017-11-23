<template>
  <div class="chart-wrap">
    <div class="title-box">
      <div class="title">本月平均准点率</div>
      <div class="cost">{{punctuality.avg && punctuality.avg * 100}}%</div>
      <div class="change" :class="[punctuality.up > 0 ? 'up' : 'down']">较上月：{{punctuality.up}}%</div>
    </div>
    <div class="chart">
      <chart :options="chartOptions" auto-resize ref="chart"></chart>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ECharts from 'vue-echarts/components/ECharts.vue'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    chart: ECharts
  },
  data () {
    return {
      punctuality: {},
      chartOptions: {
        grid: {
          show: true,
          containLabel: true,
          top: 10,
          right: 30,
          bottom: 20,
          left: 20,
          borderWidth: 0
        },
        tooltip: {
          trigger: 'axis',
          formatter: params => {
            let label = ''
            let str = []
            params.map(function (row) {
              label = row.axisValueLabel
              str.push(row.marker + row.seriesName + ': ' + row.value[1] + '%')
            })
            return label + '<br/>' + str.join('<br/>')
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#F7F7F7'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          },
          axisLabel: {
            show: true,
            color: '#333'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          min: 0,
          max: 100,
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            formatter: '{value}%'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee',
              opacity: 1
            }
          }
        },
        series: [
          {
            name: '准点率',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#79e0ff'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#b9efff'
                  },
                  {
                    offset: 1,
                    color: '#fff'
                  }
                ])
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'getOverviewPunctuality'
    ])
  },
  mounted () {
    const z = this
    z.getOverviewPunctuality().then(function (res) {
      z.punctuality = res.data
      z.$refs.chart.mergeOptions({
        series: [{
          data: res.data.punctualityRateDtoList.map(function (r) {
            return {
              name: r.date,
              value: [
                r.date,
                r.punctualityRate * 100
              ]
            }
          })
        }]
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.chart-wrap {
  .title-box {
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
  .chart {
    background-color: #fff;
    .echarts {
      width: 100%;
      min-height: calc(100vh - 192px);
    }
  }
}
</style>
