// 隐藏软键盘
export function hideKeyboard(timer = 500) {
  setTimeout(() => {
    uni.hideKeyboard()
  }, timer)
}
