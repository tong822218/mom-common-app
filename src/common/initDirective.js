import Vue from 'vue'

import { focusHide } from '@/packages'

/**
 * 初始化全局组件
 */
export default () => {
  // 聚焦后隐藏指定元素
  Vue.directive('hideOnKeyboardShow', focusHide)
}
