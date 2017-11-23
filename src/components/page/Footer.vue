<template>
  <el-footer height="30px" class="footer-wrap">
    <div>如亭公司 版权所有</div>
  </el-footer>
</template>
<script>
import Vue from 'vue'
import { Footer } from 'element-ui'

Vue.use(Footer)
export default {
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.footer-wrap {
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  padding: 0 20px;
  color: #fff;
  background-color: #353a4c;
  box-shadow: 0 -2px 3px rgba(18, 18, 18, 0.1), 0 0 0 1px rgba(18, 18, 18, 0.1);
}
</style>
