const http = uni.$u.http
import baseUrl from '@/axios/url'
const { mesUrl, adminUrl } = baseUrl()
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 获取异常类型及数量
export const getReportList = params => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}commonWarningReportPda/getReportList`,
    params,
  })
}

// 获取当前登录人员扩展信息
export const getUserDetail = params => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}mesUserExtend/getUserDetail`,
    params,
  })
}
// 获取设备列表
export const getDeviceList = params => {
  return http.request({
    method: 'GET',
    url: `${adminUrl}commonBaseEquipment/list`,
    params,
  })
}

// 查询车间，线体，工位
export const baseFactoryModeling = params => {
  return http.request({
    method: 'GET',
    url: `${adminUrl}baseFactoryModeling/children`,
    params,
  })
}
// 异常撤回
export const withdrawn = data => {
  return http.request({
    method: 'POST',
    url: `${mesUrl}commonWarningReportPda/withdrawn`,
    data,
  })
}
// 异常提报
export const mesWarnReport = data => {
  return http.request({
    method: 'POST',
    url: `${mesUrl}mesWarnReport`,
    custom: {
      loading: true,
    },
    data,
  })
}
// 异常处理顶部tabs
export const getCheckNumList = params => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}commonWarningReportPda/getCheckNumList`,
    params,
  })
}
// 获取根据状态异常处理列表
export const getCheckList = params => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}commonWarningReportPda/getCheckList`,
    custom: {
      loading: true,
    },
    params,
  })
}
// 获取异常详情
export const getCheckDetail = id => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}commonWarningReportPda/getCheckDetail/${id}`,
    custom: {
      loading: true,
    },
  })
}
// 获取异常详情
export const getReportInfoList = id => {
  return http.request({
    method: 'GET',
    url: `${mesUrl}commonWarningReportPda/getReportInfoList`,
    custom: {
      loading: true,
    },
  })
}
// 获取根据状态异常处理列表
export const receive = data => {
  return http.request({
    method: 'POST',
    url: `${mesUrl}commonWarningReportPda/receive`,
    custom: {
      loading: true,
    },
    data,
  })
}
// 获取根据状态异常处理列表
export const dispose = data => {
  return http.request({
    method: 'POST',
    url: `${mesUrl}commonWarningReportPda/dispose`,
    custom: {
      loading: true,
    },
    data,
  })
}
