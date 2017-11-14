import axios from 'axios'

export const actions = {
  /**
   * 登录
   * POST /login
   */
  login ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/login',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '登录')
        reject(error)
      })
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
  },
  /**
   * 短信登录
   */
  smsLogin ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      smsLogin(commit, state, data).then(function (status) {
        resolve(status)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/queryAllgroup
   * 查询所有的拼团信息
   * @param status 拼团状态
   */
  getPintuanAllGroup ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/queryAllgroup',
        params: data
      }).then(res => {
        console.log(res.data)
        state.pintuanAllGroup = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '查询所有的拼团信息')
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/querydatabyentityid
   * 根据拼团实体ID查询拼团实体数据
   * @param actEntityId 拼团实体ID
   */
  getPintuanDetails ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/querydatabyentityid',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询拼团实体数据')
        reject(error)
      })
    })
  },
  /**
   * GET /a/groupbuy/queryproduct
   * 商品下单详情页
   * @param activityId 拼团实体ID
   */
  getPintuanProduct ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/groupbuy/queryproduct',
        params: data
      }).then(res => {
        console.log(res.data)
        state.pintuanProduct = res.data
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '拼团商品详情')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/cancelOrder
   * 取消拼团订单
   * @param orderId 拼团订单ID
   */
  cancelPintuanOrder ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/cancelOrder',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '取消拼团订单')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/queryMygroup
   * 查询我的拼团信息
   * @param status 拼团状态
   * 0:拼团失败 再次拼团 1:拼团成功 立即使用 2:未付款 去支付 3:已付款 拼团中 邀请好友 4:已失效
   */
  getPintuanMyGroups ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/queryMygroup',
        params: data
      }).then(res => {
        console.log(res.data)
        state.pintuanMyGroup = res.data
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询我的拼团信息')
        reject(error)
      })
    })
  },
  /**
   * GET /v/groupbuy/queryexist
   * 查询是否已经参加当前的拼团
   * @param actEntityId 拼团实体ID
   */
  getPintuanExist ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/groupbuy/queryexist',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询是否已经参加当前的拼团')
        reject(error)
      })
    })
  },
  /**
   * POST /v/groupBuyingOrder
   * 拼多多下单
   * @param productId
   * @param productCatalog
   * @param saleAmonut
   * @param introducerId
   * @param actEntityId
   * @param activityId
   */
  orderPintuan ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/groupBuyingOrder',
        data: data
      }).then(res => {
        let orderId = res.data
        console.log(res.data)
        resolve(orderId)
      }).catch(error => {
        oneError(commit, state, error, '拼团下单')
        reject(error)
      })
    })
  },
  /**
   * GET /portal/isLogin
   * 判读是否登录
   */
  isLogin ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/portal/isLogin'
      }).then(res => {
        console.log(res.data)
        let status = res.data && res.data.val === 'true'
        resolve(status)
      }).catch(error => {
        oneError(commit, state, error, '登录校验')
        reject(error)
      })
    })
  },
  /**
   * GET /user/rest/wechat/userinfo
   * 获取微信OpenId
   * @param code // 微信url中的code
   */
  getWxOpenId ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/user/rest/wechat/userinfo',
        params: data
      }).then(res => {
        console.log(res.data)
        let openId = res.data.openid
        resolve(openId)
      }).catch(error => {
        oneError(commit, state, error, '获取微信OpenId')
        reject(error)
      })
    })
  },
  /**
   * GET /user/rest/wechat/ticket
   * 获取微信支付Ticket
   */
  getWxTicket ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/user/rest/wechat/ticket'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '获取微信支付Ticket')
        reject(error)
      })
    })
  },
  /**
   * POST /fuser/rest/a/h5pay
   * H5支付
   * @param orderId
   * @param openId
   * @param errorNotifyUrl ''
   * @param redirectUrl ''
   * @param returnUrl ''
   * @param skuId ''
   * @param clientSystemType '3'
   * @param payCodeEnum4H5 '1201'
   * @param paySourceEnum '6'
   */
  h5pay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/a/h5pay',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, 'H5支付')
        reject(error)
      })
    })
  },
  /**
   * 首页菜单
   * location:  11=banner 12=主菜单 13=菜单 15=救援产品
   */
  getHomeMenus ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/app/rest/a/menus',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '获取首页菜单')
        reject(error)
      })
    })
  },
  /**
   * 获取开通城市列表
   */
  getCities ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/cities',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '获取开通城市')
        reject(error)
      })
    })
  },
  /**
   * 获取产品详情
   * ?sysType=android&categoryCode=pumaintain&cityCode=320800
   */
  getProductsUnify ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/productsUnify',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '获取产品详情')
        reject(error)
      })
    })
  },
  /**
   * 查询热评的置顶热评
   * GET /a/getFirstHotEvaluate
   * categoryCode
   */
  getFirstHotEvaluate ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/getFirstHotEvaluate',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询热评的置顶热评')
        reject(error)
      })
    })
  },
  /**
   * 订单查询
   * GET /v/orders/category
   * orderStatus 订单状态:1-进行中,2-待评价,3-全部,4-服务中，5-待支付
   * categoryCode 类目：carwash-上门环保洗车，enginecabin-发动机仓清洗，glasswater-玻璃水不限量添加，antifreeze-防冻液添加
   */
  getOrders ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/category',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '订单查询')
        reject(error)
      })
    })
  },
  /**
   * 取消原因获取
   * GET /v/orders/cancel/reason
   */
  getCancelReason ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/cancel/reason'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '取消原因获取')
        reject(error)
      })
    })
  },
  /**
   * 取消订单
   * POST /v/orders/cancel
   */
  cancelOrder ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/orders/cancel',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '取消订单')
        reject(error)
      })
    })
  },
  /**
   * 查询我的车辆
   * GET /v/user/cars
   */
  getMyCars ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/user/cars'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询我的车辆')
        reject(error)
      })
    })
  },
  /**
   * 常用地址查询
   * GET /v/user/addressList/{addressType}
   * 地址类型:0.全部,1.公司,2.家
   */
  getMyAddress ({ commit, state }) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/user/addressList/0'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '常用地址查询')
        reject(error)
      })
    })
  },
  /**
   * 获取时间点
   * GET /fuser/rest/a/AppointmentTime
   * ?cityCode=
   */
  getAppointmentTimes ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/AppointmentTime',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '常用地址查询')
        reject(error)
      })
    })
  },
  /**
   * 下单
   * POST /v/orders
   * remark (string, optional): 备注,
   * appointTime (date-time): 预约时间,格式：yyyy-MM-dd HH:mm,
   * openid (string, optional): 微信用户的唯一标识,
   * addressId (integer): 用户地址ID,
   * count (integer, optional): 产品数量,
   * autoId (integer): 车辆ID,
   * productId (integer, optional): 服务产品Id,
   * parkingNo (string, optional): 车位号,
   * timeRequire (string, optional): 时间要求,
   * conponId (string, optional): 优惠券Id,
   * productCatalog (string, optional): 服务目录id，多个逗号分隔,
   * source (string, optional): 来源(ios-版本号，android-版本号，h5)
   */
  postOrder ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/orders',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '取消订单')
        reject(error)
      })
    })
  },
  /**
   * 订单查询
   * GET /v/orders/category
   * orderStatus 订单状态:1-进行中,2-待评价,3-全部,4-服务中，5-待支付
   * categoryCode 类目：carwash-上门环保洗车，enginecabin-发动机仓清洗，glasswater-玻璃水不限量添加，antifreeze-防冻液添加
   */
  getUnfinishedOrder ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/category',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '订单查询')
        reject(error)
      })
    })
  },
  /**
   * 查询支付方式(新,去除计次卡)
   * GET /v/getNewPayWay
   * orderId
   * vesion
   */
  getPayWay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/getNewPayWay',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询支付方式')
        reject(error)
      })
    })
  },
  /**
   * 付款查看可用无水洗车抵用券
   * GET /v/wcwCoupon/forPay62
   * orderId
   */
  getCouponOnPay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/wcwCoupon/forPay62',
        params: data,
        headers: {
          versionName: 'v4.4.5',
          versionCode: '445',
          clientOS: 'WeChat'
        }
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查看可用抵用券')
        reject(error)
      })
    })
  },
  /**
   * 查询我的银联活动优惠券
   * GET /v/market/redPackets
   * orderId
   */
  getUnionPacket ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/market/redPackets',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询我的银联活动优惠券')
        reject(error)
      })
    })
  },
  /**
   * 付款时使用计次卡，显示所用有效计次卡，并显示是否可用
   * GET /v/cicard/newPayList
   * orderId
   */
  getJiciCardOnPay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/cicard/newPayList',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查看可用计次卡')
        reject(error)
      })
    })
  },
  /**
   * 支付时（选择计次卡抵扣或者红包）
   * POST /v/redpacket/consumeDeduction
   * orderId (string): 订单号
   */
  consumeDeduction ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      let queryStr = '?orderId=' + data.orderId
      if (data.couponId) {
        queryStr += '&couponId=' + data.couponId
      } else if (data.cardId) {
        queryStr += '&cardId=' + data.cardId
      }
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/redpacket/consumeDeduction' + queryStr,
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '支付优惠')
        reject(error)
      })
    })
  },
  /**
   * 代客下单企业查询
   * GET /a/valet
   * orderId
   */
  getValetList ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/valet',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '代客下单企业查询')
        reject(error)
      })
    })
  },
  /**
   * 客户选选择企业支付
   * GET /v/orders/companyPay
   * orderId
   * companyCode
   */
  getCompanyPay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/companyPay',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '客户选选择企业支付')
        reject(error)
      })
    })
  },
  /**
   * 查询订单流程
   * GET /v/orders/orderflow
   * orderId
   */
  getOrderFlow ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/orderflow',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询订单流程')
        reject(error)
      })
    })
  },
  /**
   * 查询订单详情
   * GET /v/orders/{orderId}/detail
   */
  getOrderDetail ({ commit, state }, orderId) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/' + orderId + '/detail'
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询订单详情')
        reject(error)
      })
    })
  },
  /**
   * 查询订单评价信息
   * GET /v/orders/evaluate/{orderId}
   */
  getOrderEvaluate ({ commit, state }, orderId) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/v/orders/evaluate/' + orderId
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '查询订单评价信息')
        reject(error)
      })
    })
  },
  /**
   * 评价订单
   * POST /v/orders/evaluate
   * label (string, optional): 标签,
   * qualityScore (integer, optional): 质量评分,
   * timelyScore (integer, optional): 是否准时评分,
   * content (string): 评价,
   * score (integer): 评分,
   * orderId (string): 订单号,
   * attachments (array[string], optional): 上传图片后的图片名
   */
  postEvaluate ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/orders/newEvaluate',
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '评价订单')
        reject(error)
      })
    })
  },
  /**
   * 0元金额支付
   * POST /fuser/rest/v/payForZero
   * orderId (string): 订单号
   */
  payForZero ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/fuser/rest/v/payForZero?orderId=' + data.orderId,
        data: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '0元金额支付')
        reject(error)
      })
    })
  },
  /**
   * 支付宝支付
   * GET /fuser/rest/a/newAlipay
   * orderId 订单号
   * showUrl 支付宝收银台页面上，商家商品展示的url
   * returnUrl 支付宝支付成功后页面跳转url
   */
  payAlipay ({ commit, state }, data) {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/fuser/rest/a/newAlipay',
        params: data
      }).then(res => {
        console.log(res.data)
        resolve(res.data)
      }).catch(error => {
        oneError(commit, state, error, '支付宝支付')
        reject(error)
      })
    })
  }
}
/**
 * 短信登录函数，包含多个接口
 * data: {
 *  phone,
 *  verificationCode
 * }
 */
function smsLogin (commit, state, data) {
  let checkCode
  let ticket
  /**
   * 获取登录ticket
   */
  function getLoginTicket () {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'get',
        url: '/api/v3/portal/outward/getLoginTicket',
        params: {
          appId: 'FI0001'
        },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res.data)
        ticket = res.data && res.data.val
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '获取登录ticket')
        reject(error)
      })
    })
  }
  /**
   * 检验短信验证码是否正确
   *
   * @param phone                手机号码
   * @param verificationCodeType 验证码类型：1：注册 , 2：找回登陆密码(参数类型为字符串)
   * @param verificationCode     短信验证码
   * @param tokenFlag            令牌需求标识0-不需求1-需求，默认为1
   * @param certificateType      凭证类型0-验证码1-令牌，默认为0
   * @return
   */
  function validateSmsCode () {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/outward/validateSmsCode?verificationCodeType=6&tokenFlag=1&certificateType=0&phone=' + data.phone + '&verificationCode=' + data.verificationCode,
        // data: {
        //   phone: data.phone,
        //   verificationCode: data.verificationCode,
        //   verificationCodeType: 6,
        //   tokenFlag: 1,
        //   certificateType: 0
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res.data)
        checkCode = res.data && res.data.newVerifyCode
        resolve()
      }).catch(error => {
        oneError(commit, state, error, '检验短信验证码')
        reject(error)
      })
    })
  }
  /**
   * 短信验证码登录
   */
  function loginRemote () {
    return new Promise(function (resolve, reject) {
      axios({
        method: 'post',
        url: '/api/v3/portal/loginRemote?verificationCodeType=6&appId=FI0001&loginModeType=2&target=none&isajax=true&cellphone=' + data.phone + '&phoneVeriCode=' + checkCode + '&lt=' + ticket,
        // data: {
        //   cellphone: data.phone,
        //   phoneVeriCode: checkCode,
        //   lt: ticket,
        //   verificationCodeType: 6,
        //   appId: 'FI0001',
        //   loginModeType: 2,
        //   target: 'none',
        //   isajax: true
        // },
        headers: {
          appId: 'FI0001',
          appKey: 'FIK0001'
        }
      }).then(res => {
        console.log(res.data)
        resolve(res.status)
      }).catch(error => {
        oneError(commit, state, error, '短信验证码登录')
        reject(error)
      })
    })
  }
  return new Promise(function (resolve, reject) {
    validateSmsCode().then(function () {
      getLoginTicket().then(function () {
        loginRemote().then(function (status) {
          resolve(status)
        }).catch(error => {
          reject(error)
        })
      }).catch(error => {
        reject(error)
      })
    }).catch(error => {
      reject(error)
    })
  })
}
// 通用的错误处理
function oneError (commit, state, error, name) {
  console.dir(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data)
    let errorText = name + '失败：' + (error.response.data && error.response.data.message) || '回应失败'
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request)
    let errorText = name + '失败：请求失败'
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
    let errorText = name + '失败：' + error.message
    commit('showToast', {
      type: 'warn',
      text: errorText
    })
  }
}
