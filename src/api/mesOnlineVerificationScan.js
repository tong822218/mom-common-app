const http = uni.$u.http
import adminUrl from '@/axios/url'
const { wmsUrl, dataUrl } = adminUrl()
// const baseUrl = "http://127.0.0.1:10203"
// function baseUrl() {
//   return "http://127.0.0.1:10203";
// }

/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 获取单号
export const getSummaryQuantity = params => {
  return http.request({
    method: 'GET',
    url: `${wmsUrl}wmsOutTaskPda/summaryQuantity`,
    params,
  })
}
// 获取单号
export const getOrderNumber = () => {
  return http.request({
    method: 'GET',
    url: `${wmsUrl}wmsOutTaskPda/getOutTaskOrderNo?orderType=80`,
  })
}
// 获取单号
export const queryOrder = data => {
  return http.request({
    method: 'POST',
    url: `${wmsUrl}wmsOutTaskPda/queryOrder`,
    data,
  })
}
// 扫描
export const scan = data => {
  return http.request({
    method: 'POST',
    url: `${wmsUrl}wmsOutTaskPda/submit`,
    data,
  })
}
// 扫描库位
export const getLocation = params => {
  return http.request({
    method: 'get',
    url: `${wmsUrl}wmsOutTaskPda/scanloc`,
    params,
  })
}
// 条码退扫
export const cancelScan = data => {
  return http.request({
    method: 'post',
    url: `${wmsUrl}wmsOutTaskPda/cancel`,
    data,
  })
}
// 数量退扫
export const noBarcodeBackscan = data => {
  return http.request({
    method: 'post',
    url: `${wmsUrl}wmsOutTaskPda/cancelWithNum`,
    data,
  })
}
// 获取扫描详情
export const getOrderDetail = data => {
  return http.request({
    method: 'GET',
    url: `${wmsUrl}wmsOutTaskPda/getOrderDetail`,
    data,
  })
}
// 获取可扫描数量
export const getInventoryNum = data => {
  return http.request({
    method: 'post',
    url: `${wmsUrl}wmsOutTaskPda/getInventoryNum`,
    data,
  })
}
// 记账
export const confirmOrde = data => {
  return http.request({
    method: 'post',
    url: `${wmsUrl}wmsOutTaskPda/confirm`,
    data,
  })
}
