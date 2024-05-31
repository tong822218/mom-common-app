const global = {
  state: {
    showKeyboard: false, // 是否弹窗了软键盘
    platform: 'app', // app基座是通过哪个平台启动的，默认是app
    test: ''
  },
  mutations: {
    //是否是从app进入的页面
    SET_SHOWKEYBOARD: (state, showKeyboard) => {
      state.showKeyboard = showKeyboard || false
    },
    SET_PLATFORM: (state, platform) => {
      state.platform = platform || 'app'
    }
  },
  actions: {}
}

export default global
