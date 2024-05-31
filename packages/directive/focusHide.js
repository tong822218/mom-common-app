import store from '@/store'
export default {
  inserted(el) {
    // 设置resize监听方法
    el.resizeListener = (res) => {
      const { screenHeight, windowHeight } = res.size
      if (windowHeight < screenHeight - 200) {
        handleKeyboardShow(el)
        console.log('键盘出现')
        store.commit('SET_SHOWKEYBOARD', true)
      } else {
        console.log('键盘收起')
        handleKeyboardHide(el)
        store.commit('SET_SHOWKEYBOARD', false)
      }
    }
    // 监听软键盘显示和隐藏事件
    uni.onWindowResize(el.resizeListener)
  },
  unbind(el) {
    console.log('取消监听键盘')
    uni.offWindowResize(el.resizeListener)
  }
}

const handleKeyboardShow = (el) => {
  el.style.display = 'none'
}

const handleKeyboardHide = (el) => {
  el.style.display = 'block'
}
