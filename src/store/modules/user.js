const user = {
  state: {
    token: uni.getStorageSync('token'),
    userInfo: {},
    menus: [],
    baseUrl: '',
    factory: {},
    modeling: {},
    orderType: {},
    isAppStart: false, // 是否从app进入的
    operatorInfo: {} // 当前操作人信息
  },
  mutations: {
    //设置token
    SET_TOKEN: (state, result = null) => {
      state.token = result
    },
    SET_URL: (state, result = null) => {
      state.baseUrl = result
    },
    //设置登录人信息
    SET_USERINFO: (state, user) => {
      state.userInfo = user || {}
    },
    //权限菜单
    SET_MENUS: (state, menus = []) => {
      state.menus = menus
    },
    //工厂
    SET_FACTORY: (state, factory) => {
      state.factory = factory || {}
    },
    //仓库
    SET_MODELING: (state, modeling) => {
      state.modeling = modeling || {}
    },
    //按单出库单类型
    SET_ORDERTYPE: (state, orderType) => {
      state.orderType = orderType || {}
    },
    //是否是从app进入的页面
    SET_ISAPPSTART: (state, isAppStart) => {
      state.isAppStart = isAppStart || false
    },
    // 设置当前操作人
    SET_OPERATORINFO: (state, operatorInfo) => {
      state.operatorInfo = operatorInfo
    }
  },
  actions: {}
}

export default user
