import Vue from 'vue'
import App from './App'
import initMixins from './common/initMixins'
import initDirective from './common/initDirective'
import initComponents from '@/common/initComponents.js'
import store from './store'
import { useRequest, useUniService } from './packages'
//注册国际化
import i18n from './lang'
// 水印
import waterMask from "@/components/waterMask/install";
//安装水印
// #ifdef H5
Vue.use(waterMask);
// #endif
// 初始化全局组件
initComponents()

//初始化全局mixins
initMixins()

// 初始化自定义指令
initDirective()

// h5 app 通信服务
useUniService()

// 初始化API请求封装
useRequest(store)

App.mpType = 'app'
const app = new Vue({
  store,
  i18n,
  ...App
})

app.$mount()

export default app
