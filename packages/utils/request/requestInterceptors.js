/**
 * 请求拦截
 * @param {Object} http
 */
export default (store) => {
  uni.$u.http.interceptors.request.use(
    (config) => {
      const header = {
        ...config.header
      }
      const token = uni.getStorageSync('token')
      if (token) {
        header.satoken = `${token}`
      }
      config.header = {
        ...header,
        lang: store.getters.language
      }
      const { loading } = config.custom
      loading
        ? uni.showLoading({
            title: uni.$i18n.t('common.loading'),
            mask: true
          })
        : null
      return config
    },
    (
      config // 可使用async await 做异步操作
    ) => Promise.reject(config)
  )
}
