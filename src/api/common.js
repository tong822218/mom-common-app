const http = uni.$u.http
import url from "@/axios/url"
const { adminUrl, mesUrl } = url()
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 数据字典
export const getDict = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/${data}`
  })
}
// 根据用户编码查询用户扩展信息
export const getUserExtendByUserCode = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesUserExtend/getUserExtendByUserCode`,
    data
  })
}
