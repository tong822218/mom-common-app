import Vue from 'vue'
import loading from '@/components/plugin/loading.js'
import crop from '@/components/valueSplice/index'
import { uView, mpaasScan } from '@/packages'
import showMessage from '@/utils/message.js'

/**
 * 初始化全局组件
 */
export default () => {

  Vue.prototype.$loading = loading
  Vue.prototype.$showMessage = showMessage
  Vue.prototype.$crop = crop
  Vue.prototype.$mpaasScan = mpaasScan
  Vue.prototype.$cardActiveColor = {
    background: '#c2e7b0',
  }

  Vue.use(uView)

  uni.$u.setConfig({
    // 修改$u.props对象的属性
    props: {
      button: {
        throttleTime: 1000,
      },
    },
  })
}
