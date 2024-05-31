/**
 * 响应拦截
 * @param {Object} http
 */
import { hideKeyboard } from '../../utils/common/hideKeyboard'

export default (store) => {
  uni.$u.http.interceptors.response.use(
    (res) => {
      const { loading } = res.config.custom
      loading ? uni.hideLoading() : null
      // loading ? hideKeyboard() : null;
      if (res.data.code == 0) {
        return res
      } else {
        if (res && res.data.code === 102) {
          uni.showToast({
            title: res.data.message || uni.$i18n.t('ajaxErr.reLogin'),
            position: 'top',
            icon: 'none',
            duration: 3000
          })
          uni.reLaunch({
            url: '/pages/login/index'
          })
          return Promise.reject(res)
        } else {
          uni.showToast({
            title: res.data.message || uni.$i18n.t('ajaxErr.400'),
            position: 'top',
            icon: 'none',
            duration: 5000
          })
          return Promise.reject(res)
        }
      }
    },
    (response) => {
      const statusCode = response.statusCode
      const { loading, hidenToast } = response.config.custom
      loading ? uni.hideLoading() : null
      if (!hidenToast) {
        uni.showToast({
          title: uni.$i18n.t('ajaxErr')[statusCode] || uni.$i18n.t('ajaxErr')['default'],
          position: 'top',
          icon: 'none',
          duration: 3000
        })
      }
      // loading ? hideKeyboard() : null;
      return Promise.reject(response)
    }
  )
}
