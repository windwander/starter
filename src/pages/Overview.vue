<template>
  <el-row id="OverviewPage">
    <el-col :span="12" class="left-wrap">
      <OverviewMap></OverviewMap>
    </el-col>
    <el-col :span="12" class="right-wrap">
      <OverviewChart></OverviewChart>
    </el-col>
  </el-row>
</template>
<script>
import OverviewMap from '../components/Overview/Map'
import OverviewChart from '../components/Overview/Chart'

export default {
  components: {
    OverviewMap,
    OverviewChart
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
#OverviewPage {
  height: 100%;
  .left-wrap {
    padding-right: 5px;
  }
  .right-wrap {
    padding-left: 5px;
  }
}
</style>
