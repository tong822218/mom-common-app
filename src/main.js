import Vue from 'vue'
import App from './App'

// 初始化API请求封装
// useRequest(store)

App.mpType = 'app'
const app = new Vue({
  ...App,
})

app.$mount()

export default app
