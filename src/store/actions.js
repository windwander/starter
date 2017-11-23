import axios from 'axios'
import router from '../router'

export const actions = {
  /**
   * 登录
   * POST /login
   * @param username
   * @param pwd
   */
  login ({ commit, state }, data) {
    return getData(commit, state, {
      method: 'get',
      url: '/user/login',
      name: '登录',
      data: data,
      noAuth: true,
      success: (res) => {
        if (res.headers.authorization) {
          commit('setAuthCode', res.headers.authorization)
        }
      }
    })
  },
  /**
   * GET /portal/logoutRemote?isajax=true
   * 登出
   */
  logout ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/portal/logoutRemote?isajax=true'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '登出')
        reject(error)
      })
    })
  },
  /**
   * GET /overview/total/cost
   * 总物流成本
   */
  getOverviewCost ({ commit, state }) {
    return getData(commit, state, {
      method: 'get',
      url: '/overview/total/cost',
      name: '查询总物流成本'
    })
  },
  /**
   * GET /overview/total/punctuality-rate
   * 平均准点率
   */
  getOverviewPunctuality ({ commit, state }) {
    return getData(commit, state, {
      method: 'get',
      url: '/overview/total/punctuality-rate',
      name: '查询平均准点率'
    })
  },
  /**
   * 获取短信验证码
   */
  sendSmsCode ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/sendSmsCode?isajax=true&verificationCodeType=6&phone=' + data.phone + '&graphCode=' + data.graphCode,
        // data: {
        //   phone: data.phone,
        //   graphCode: data.graphCode,
        //   verificationCodeType: 6,
        //   isajax: true
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res)
        resolve(res.status)
      }).catch(error => {
        oneError(commit, state, error, '发送短信验证码')
        reject(error)
      })
    })
  }
}
/**
 * 通用的错误处理
 */
function oneError (commit, state, error, name) {
  console.dir(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    let errorText = name + '失败：'
    if (error.response.data) {
      if (error.response.data.error) {
        errorText += error.response.data.error
      } else {
        errorText += error.response.data
      }
    } else {
      errorText += '回应失败'
    }
    commit('showMessage', {
      type: 'error',
      message: errorText
    })
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    let errorText = name + '失败：请求失败'
    commit('showMessage', {
      type: 'error',
      message: errorText
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    let errorText = name + '失败：'
    if (error.message) {
      errorText += error.message
    } else {
      errorText += '未知错误'
    }
    commit('showMessage', {
      type: 'error',
      message: errorText
    })
  }
}
/**
 * 通用数据获取
 * @param config {
 *  method: String
 *  url: String
 *  data: Object
 *  name: String
 *  success: Function
 * }
 */
function getData (commit, state, config) {
  return new Promise(function (resolve, reject) {
    let axiosData = {
      method: config.method,
      url: '/api' + config.url
    }
    if (state.authCode && !config.noAuth) {
      axiosData.headers = {
        Authorization: state.authCode
      }
    }
    if (config.data) {
      if (config.method === 'get') {
        axiosData.params = config.data
      } else if (config.method === 'post') {
        axiosData.data = config.data
      }
    }
    axios(axiosData).then(response => {
      console.log(response.data)
      if (response.data.success) {
        if (config.success) {
          config.success(response)
        }
        resolve(response.data)
      } else {
        let msg = response.data.message
        if (response.data.message === '无效token') {
          msg = '登录信息已过期，请重新登录'
          router.push({
            name: 'Login'
          })
        } else if (response.data.message === '用户未登录') {
          router.push({
            name: 'Login'
          })
        }
        commit('showMessage', {
          type: 'error',
          message: msg
        })
      }
    }).catch(error => {
      oneError(commit, state, error, config.name)
      reject(error)
    })
  })
}
