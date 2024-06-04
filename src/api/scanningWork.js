const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { mesUrl, dataUrl, eamUrl } = adminUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 查询生产工单
export const getMesProdOrder = (data) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesProdOrder/pageForStartScan`,
    data,
  });
};
// 获取设备信息
export const getEamExtensionEquipment = (data) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${dataUrl}commonBaseEquipment/list`,
    data,
  });
};
// 获取工装信息
export const getMesExtensionFrock = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${dataUrl}commonExtensionFrock/scanMesExtensionFrock`,
    params,
  });
};

//新增开工扫描表
export const mesScanStart = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScanStart`,
    data,
    custom: { loading: true },
  });
};
// 获取设备信息扩展信息
export const getExtensionEquipment = (data) => {
  return http.request({
    method: "GET",
    // async: false,
    url: `${eamUrl}eamExtensionEquipment/list`,
    data,
  });
};
export const getProcessCell = (data) => {
  return http.request({
    method: "POST",
    // async: false,
    url: `${mesUrl}mesProcessCell/getCellList`,
    data,
  });
};
// 获取设备模型
export const getEquipmentModeling = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${dataUrl}commonBaseEquipmentModeling/getEquipmentList`,
    params,
  });
};
// 工单-模糊查询
export const getFuzzySearchOrderList = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/getFuzzySearchOrderList`,
    params,
  });
};
// 工单-精确查询
export const queryOrder = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/queryOrder`,
    params,
  });
};
// 设备-模糊查询
export const getFuzzySearchEquipmentList = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/getFuzzySearchEquipmentList`,
    params,
  });
};
// 设备-精确查询
export const queryEquipment = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/queryEquipment`,
    params,
  });
};
// 工装-模糊查询
export const getFuzzySearchList = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/getFuzzySearchList`,
    params,
  });
};
// 工装-精确查询
export const queryExtensionFrock = (params) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScanStartPda/queryExtensionFrock`,
    params,
  });
};
// 提交
export const save = (data) => {
  return http.request({
    method: "POST",
    custom: {
      loading: true,
    },
    url: `${mesUrl}mesScanStartPda/save`,
    data,
  });
};
//获取工作日期
export const getWorkDate = (code) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesCommon/getWorkDate/${code}`,
  
  });
};