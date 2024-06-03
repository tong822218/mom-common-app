// 防抖
export const debounce = function (fn, delay) {
  let timer = null
  return function (value) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, value)
    }, delay)
  }
}
