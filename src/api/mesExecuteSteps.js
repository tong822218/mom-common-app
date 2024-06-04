const http = uni.$u.http;
import localUrl from "@/axios/url";
const { adminUrl, mesUrl } = localUrl();

/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 公布类型
export const stepTypeList = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/step_type`,
    custom: { loading: true },
  });
};

// 批量保存工步信息
export const batchAdd = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/batchAdd`,
    custom: { loading: true },
    data,
  });
};
//刷新工步数据
export const getStepDetailRecord = (data = {}) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/list`,
    data,
    custom: { loading: true },
  });
};
//执行工步接口
export const saveDetail = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/saveDetail`,
    data,
    custom: { loading: true },
  });
};
//获取主关件列表
export const queryKeyParts = (data = {}) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/queryKeyParts`,
    data,
    custom: { loading: true },
  });
};

//叫停
export const stopSteps = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/stop`,
    data,
    custom: { loading: true },
  });
};
//强制放行
export const releaseSteps = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/release`,
    data,
    custom: { loading: true },
  });
};

export const stepComplete = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/complete`,
    data,
    custom: { loading: true },
  });
};

export const getInfoBtn = (data = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProductProcessStepDetailRecordPda/getStepDetail`,
    data,
    custom: { loading: true },
  });
};
