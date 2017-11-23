import { Message } from 'element-ui'

export const state = {
  device: {
    isMobile: false
  },
  navMenus: JSON.parse(sessionStorage.getItem('nav')),
  authCode: sessionStorage.getItem('auth')
}

export const mutations = {
  // 修改设备，是否移动设备
  setDevice (state, payload) {
    state.device.isMobile = payload.isMobile
  },
  // 是否折叠侧边导航
  toggleSideNav (state) {
    state.collapseSideNav = !state.collapseSideNav
  },
  // 设置AuthCode
  setAuthCode (state, authorization) {
    state.authCode = authorization
    sessionStorage.setItem('auth', state.authCode)
  },
  // 设置提示信息
  showMessage (state, payload) {
    if (payload.message) {
      Message({
        message: payload.message,
        type: payload.type,
        duration: payload.duration || 3000,
        showClose: payload.duration || true,
        center: payload.center || false,
        onClose: payload.onClose,
        customClass: payload.customClass,
        iconClass: payload.iconClass,
        dangerouslyUseHTMLString: payload.dangerouslyUseHTMLString
      })
    }
  },
  // 隐藏提示信息
  hideToast (state) {
    state.toast.show = false
  },
  // 设置导航菜单
  setNavMenus (state, payload) {
    state.navMenus = payload
    sessionStorage.setItem('nav', JSON.stringify(payload))
  },
  // 设置加载中信息
  showLoading (state, payload) {
    state.loading.show = true
    state.loading.text = (payload && payload.text) || ''
  },
  // 隐藏加载中信息
  hideLoading (state) {
    state.loading.show = false
  },
  setOrderInfo (state, payload) {
    state.orderInfo = payload
  }
}
