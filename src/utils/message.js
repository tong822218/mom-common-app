// 封装的展示消息提示的方法
export default (title = '数据加载失败！', duration = 2500) => {
  return new Promise((resolve, reject) => {
    uni.showToast({
      title,
      duration,
      icon: 'none',
      success: () => {
        setTimeout(() => {
          resolve()
        }, duration)
      },
      fail: () => {
        reject()
      }
    })
  })
}
