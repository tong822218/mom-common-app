const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl } = baseUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 模糊搜索工单
export const searchOrderList = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/searchOrderList`,
    data,
    custom: { loading: false },
  });
};
// 获得指定工单信息
export const getReportTypeOrder = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getReportTypeOrder`,
    data,
    custom: { loading: true },
  });
};
// 获取不良明细
export const getBadnessDetailList = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getBadnessDetailList`,
    data,
    custom: { loading: true },
  });
};
// 获取工时明细
export const getHourDetailList = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getHourDetailList`,
    data,
    custom: { loading: true },
  });
};

//根据工单号、报工类型获取工单列表数据
export const getOrderInfo = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getOrderInfo`,
    data,
    custom: { loading: true },
  });
};
//结束工单
export const finishOrder = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/finishOrder`,
    data,
    custom: { loading: true },
  });
};


// 获取报工工序列表
export const getProcessListByOrderCode = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getProcessListByOrderCode`,
    data,
    custom: { loading: true },
  });
};
//获取单个工序的工时和设备列表
export const getScanProcess = (data) => {
  return http.request({
    method: "",
    url: `${mesUrl}mesScan/getScanProcess`,
    data,
    custom: { loading: true },
  });
};
//获取不良分类树
export const getCategoryTree = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}commonDefectiveLibraryCategory/tree`,
    data,
    custom: { loading: true },
  });
};
//获取不良分类树
export const getCategoryTreeNew = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}commonDefectivePhenomenon/tree`,
    data,
    custom: { loading: true },
  });
};
//获取设备列表
export const getEquipmentList = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getEquipmentList`,
    data,
    custom: { loading: true },
  });
};
// 增加执行详情
export const addExecutingBeginend = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/addExecutingBeginend`,
    data,
    custom: { loading: true },
  });
};
// 结束执行
export const closeExecutingBeginend = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/closeExecutingBeginend`,
    data,
    custom: { loading: true },
  });
};
// 报工
export const orderReportCommit = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/orderReportCommit`,
    data,
    custom: { loading: true },
  });
};
//获取工作日
export const getWorkDate = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesCommon/getWorkDate/SK100`,
    data,
    custom: { loading: true },
  });
};

// 根据检索条件搜索工单
export const getMesProdOrderList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getMesProdOrderList`,
    data,
    custom: { loading: true },
  });
};

// 唯一码报工查询工序接口
export const onlyCodeScanProcess = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesUniqueCodeScan/scanProcess`,
    data,
    custom: { loading: false },
  });
};

// 唯一码通过主码获取信息
export const getInfoByMainBarcode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/getInfoByMainBarcode`,
    data,
    custom: { loading: true },
  });
};

// 唯一码通过主码获取信息
export const scanKeyPartCode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/scanKeyPartCode`,
    data,
    custom: { loading: true },
  });
};

// 唯一码提交
export const submitScanUniqueCode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/submitScanUniqueCode`,
    data,
    custom: { loading: true },
  });
};
// 唯一码 补录不良
export const rerecordDefect = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/rerecordDefect`,
    data,
    custom: { loading: true },
  });
};

