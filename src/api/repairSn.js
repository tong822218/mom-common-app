const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl } = baseUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
// 详情
export function searchSn (data = {}) {
  return http.request({
    url: `${mesUrl}mesRepairMaterial/searchSn`,
    method: "get",
    custom: { loading: true },
    data,
  });
}
export function getByOrder (data = {}) {
  return http.request({
    url: `${mesUrl}mesRepairMaterial/getByOrder`,
    method: "get",
    custom: { loading: true },
    data,
  });
}
export function repair (data = {}) {
  return http.request({
    url: `${mesUrl}mesRepairMaterial/repair`,
    method: "post",
    custom: { loading: true },
    data,
  });
}

