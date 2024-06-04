const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl, adminUrl } = baseUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//获取条码列表
export const getBarcodeList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getBarCodeList`,
    // url: `http://localhost:10101/mes-pda/orderTracking/getBarCodeList`,
    data,
  });
};

//获取条码扫描情况汇总
export const getBarcodeStatus = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getBarCodeCollect`,
    // url: `http://localhost:10101/mes-pda/orderTracking/getBarCodeCollect`,
    data,
  });
};

//获取工序及扫描比例
export const getProcessScanRate = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getProcessScanRate`,
    // url: `http://localhost:10101/mes-pda/orderTracking/getProcessScanRate`,
    data,
  });
};

//获取销售订单详情
export const getSaleOrderDetail = (data) => {
  return http.request({
    method: "GET",
    // url: `http://localhost:10101/mes-pda/saleTracking/getSaleOrderDetail`,
    url: `${mesUrl}saleTracking/getSaleOrderDetail`,
    data,
  });
};

//获取订单列表
export const getMesSaleOrder = (data) => {
  return http.request({
    method: "GET",
    // url: `http://localhost:10101/mes-pda/saleTracking/getMesSaleOrder`,
    url: `${mesUrl}mesProdOrderPlan`,
    data,
  });
};

//获取生产订单列表
export const getMesProdOrder = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesProdOrder`,
    data,
  });
};

// 根据条码号获取条码详细信息
export const getBarCodeMessage = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getBarCodeMessage`,
    data,
  });
};

// 根据条码号获取绑定主关件列表
export const getMesScanKeyPartsList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getMesScanKeyPartsList`,
    data,
  });
};

// 根据条码号获取过程检验列表
export const getMesCheckRecordList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getMesCheckRecordList`,
    data,
  });
};

// 根据条码号获取过程检验列表
export const getProductionLog = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}orderTracking/getProductionLog`,
    // url: `http://localhost:10101/mes-pda/orderTracking/getProductionLog`,
    data,
  });
};

// 订单状态接口
export const getOrderType = (data) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}dict/type/plan_status`,
    data,
  });
};
