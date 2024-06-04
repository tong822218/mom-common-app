import Vue from 'vue'

import foucs from '@/mixins/foucs.js'
import langBarTitle from '@/mixins/langBarTitle.js'
/**
 * 初始化全局组件
 */
export default () => {
  // 光标聚焦
  Vue.mixin(foucs);
  Vue.mixin(langBarTitle)
}
