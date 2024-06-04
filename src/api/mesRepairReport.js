const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl } = baseUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 模糊查询工单列表
export const getList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesRepairMaterial/searchReview`,
    params
  });
};
// 模糊查询工单列表
export const getListPage = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesRepairMaterial/appPage`,
    params,
    custom: {
      loading: true
    }
  });
};
// 获得不良明细列表
export const getDefectiveByRepairCode = (repairCode) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScanRecordDefective/getDefectiveByRepairCode/${repairCode}`,
    custom: {
      loading: true
    }
  });
};
// 获得调整弹窗信息
export const getAdjustDialog = (repairCode) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesRepairMaterial/getAdjustDialog/${repairCode}`,
    custom: {
      loading: true
    }
  });
};
// 获得调整弹窗信息
export const getByOrder = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesRepairMaterial/getByOrder`,
    params,
    custom: {
      loading: true
    }
  });
};
// 提交返修结果
export const repairBatch = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesRepairMaterial/repairBatch`,
    data,
    custom: {
      loading: true
    }
  });
};

// 提交批量调整结果
export const adjustReview = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesRepairMaterial/adjustReview`,
    data,
    custom: {
      loading: true
    }
  });
};




