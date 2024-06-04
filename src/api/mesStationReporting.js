const http = uni.$u.http;
import localUrl from "@/axios/url";
const { adminUrl, mesUrl } = localUrl();
// const baseUrl = 'http://localhost:8001'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

export const getUserExtendInfo = (data) => {
  return http.request({
    method: "GET",
    async: false,
    url: `${mesUrl}mesScan/getListByCode`,
    data,
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
//根据工单号，获取扫描工序汇总列表
export const getScanRecordList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getScanRecordList`,
    data,
    custom: { loading: true },
  });
};
//根据工单号、工序编码 获取不良汇总列表
export const getRecordDefectiveList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getRecordDefectiveList`,
    data,
    custom: { loading: true },
  });
};

// 生产执行-开始按钮-新增开始记录
export const addExecutingBeginend = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/addExecutingBeginend`,
    data,
    custom: { loading: true },
  });
};
// 生产执行-获取生产执行开始/结束记录列表
export const getExecutingBeginendList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getExecutingBeginendList`,
    data,
    custom: { loading: true },
  });
};
// 生产执行-结束按钮
export const closeExecutingBeginend = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/closeExecutingBeginend`,
    data,
    custom: { loading: true },
  });
};

// 根据工单号获取工单信息、各工序及各工序设备列表（table报工查询接口）
export const getScanProcessList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getScanProcessList`,
    data,
    custom: { loading: true },
  });
};
// 根据id获取各工序及各工序设备列表（统一报工查询接口）
export const getScanProcessListByBeginendId = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getScanProcessListByBeginendId`,
    data,
    custom: { loading: true },
  });
};
// 根据工位获取设备
export const getEquipmentListNes = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getBeginendEquipmentList`,
    data,
    custom: { loading: true },
  });
};
//获取不良分类树
export const getCategoryTree = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}commonDefectivePhenomenon/tree`,
    data,
    custom: { loading: true },
  });
};

//报工提交
export const submitScanPC = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/submitScanPC`,
    // url: `http://localhost:10101/mes-pda/mesScan/submitScanPC`,
    data,
    custom: { loading: true },
  });
};

//关闭工单
export const finishOrder = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/finishOrder`,
    data,
    custom: { loading: true },
  });
};

//根据线体，工序获取工位下拉框列表
export const getWorkCellList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getWorkCellList`,
    data,
    custom: { loading: true },
  });
};
//查询型号list
export const xhList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getProdList`,
    data,
    custom: { loading: true },
  });
};

//查工序list
export const processList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getProcessListByOrderCode`,
    params,
    custom: { loading: true },
  });
};
//工序唯一码报工-主码扫描
export const scanMainBarCode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/scanMainBarCode`,
    data,
    custom: { loading: true },
  });
};
//工序唯一码报工-主关件扫描
export const scanKeyPartCode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesUniqueCodeScan/scanKeyPartCode`,
    data,
    custom: { loading: true },
  });
};


//获得指定工单的信息
export const getCellBatchListByOrderCode = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getCellBatchListByOrderCode`,
    data,
    custom: { loading: true },
  });
};
//二级页-获得单个工序的工时和设备列表
export const getProcessBatchScanProcess = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/getProcessBatchScanProcess`,
    data,
    custom: { loading: true },
  });
};