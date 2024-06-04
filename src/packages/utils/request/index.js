import requestInterceptors from './requestInterceptors'
import responseInterceptors from './responseInterceptors'
export default (store) => {
  // 初始化请求配置
  uni.$u.http.setConfig((defaultConfig) => {
    /* defaultConfig 为默认全局配置 */
    /* withCredentials 携带cookie凭证*/
    defaultConfig.withCredentials = true
    return defaultConfig
  })
  requestInterceptors(store)
  responseInterceptors()
}
