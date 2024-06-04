const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { baseUrl,mesUrl } = adminUrl();

/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
//获取工序下拉
export const getProcessList = (factoryCode) => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-service/mesProcess/list?factoryCode=${factoryCode}`,
  });
};
//获取工序下拉
export const getInitProcessList = () => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-service/mesProcess/list?processProperty=repair`,
  });
};
//获取计划数据
export const getProcessData = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/getProcessScanPageList`,
    data,
  });
};

//获取返修主界面数据
export const getRepairMainPageList = (params) => {
  console.log("data=========");
  console.log(params);
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getRepairPageList`,
    params,
  });
};

//弹窗回车事件(获取未返修数据)
export const doSearch = (data) => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getUnRepairListByCode`,
    data,
  });
};

//返修信息点击事件(根据id获取待返修数据)
export const getRepairInfoById = (id) => {
  console.log("id==" + id);
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getRepairDetailData/` + id,
  });
};
//获取缺陷部位
export const getDefectLocationList = () => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/service/mesDefectLocation/list`,
  });
};
//获取现象部位
export const getDefectPhenomenonList = () => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/common-service/mesDefectPhenomenon/list`,
  });
};
//获取缺陷原因
export const getDefectReasonList = (params) => {
  console.log(params);
  return http.request({
    method: "GET",
    url: `${baseUrl()}/common-service/mesDefectReason/list`,
    params,
  });
};
//获取返修措施
export const getRepairMeasureList = () => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/auth/dict/type/repair_measure`,
  });
};
// 获取人员列表
export const getEmployeeList = () => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/service/mesDefectReason/list`,
  });
};
// 提交返修信息
export const submitRepairInfo = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/repair`,
    data,
  });
};

// 获取已返修信息
export const getRepairedList = (data) => {
  return http.request({
    method: "GET",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getRepairedList`,
    data,
  });
};
