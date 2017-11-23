<template>
  <div class="login-wrap">
    <el-card class="login-form">
      <div slot="header">请登录系统</div>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        label-position="left"
        label-width="80px"
        ref="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" @keyup.native.enter="submitLoginForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitLoginForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapMutations, mapActions } from 'vuex'
import { Card, Form, FormItem, Input, Button } from 'element-ui'

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          min: 3,
          max: 20,
          message: '长度在 3 到 20 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    ...mapMutations([
      'showMessage',
      'setNavMenus'
    ]),
    ...mapActions([
      'login'
    ]),
    submitLoginForm () {
      const z = this
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.login({
            username: this.loginForm.username,
            pwd: this.loginForm.password
          }).then(function (res) {
            if (res.success) {
              console.log('++ login success ++')
              z.setNavMenus(res.data)
              z.$router.push({
                name: 'Overview'
              })
            } else {
              z.showMessage({
                message: res.message,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -10px;
  height: calc(100vh - 80px);
  background-image: url(/static/images/login-bg.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  .login-form {
    width: 300px;
    margin: 0 auto;
    .login-btn {
      width: 100%;
    }
  }
}
</style>


