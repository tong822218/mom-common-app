const http = uni.$u.http
import baseUrl from '@/axios/url'
const { adminUrl } = baseUrl()
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//菜单
export const getTemplateListByProduct = (params) => {
  return http.request({
    method: 'GET',
    url: `${adminUrl}commonTemplateConfig/listByConfigRole`,
    params
  })
}
//菜单
export const getTemplateDetail = (params) => {
  return http.request({
    method: 'GET',
    url: `${adminUrl}system/template/getInfoByCode`,
    params
  })
}
