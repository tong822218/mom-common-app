const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { mesUrl, dataUrl } = adminUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
// 获取上料验证主表
export const getVerificationList = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getVerificationList`,
  });
};

// 获取生产工单列表
// export const getMesProdOrderList = (data = {}) => {
//   return http.request({
//     method: "POST",
//     data,
//     url: `${mesUrl}mesLoadMaterialVerification/getMesProdOrderList`,
//   });
// };
// 获取上料验证明细列表
export const getVerificationDetailList = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getVerificationDetailList`,
  });
};
// 校验扫描的领料单是否属于此订单
export const checkOrderNo = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesRequisitionOrder/checkOrderNo`,
  });
};
// 校验扫描的箱码是否属于此订单（条码号，订单编码）
export const checkBarcode = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/checkBarcode`,
  });
};
// 退扫
export const cancelScan = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/cancelScan`,
  });
};

// 完成验证
export const handleSubmit = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/handleSubmit`,
  });
};
// 完成验证_直接改状态1-》2
export const handleSubmitDirect = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/handleSubmitDirect`,
  });
};
// 分页
export const getVerificationDetailPage = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getVerificationDetailPage`,
  });
};
// 获取工单信息
export const getPrdMsg = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getPrdMsg`,
  });
};
// 根据线体编码获取工位列表
export const getWorkCellList = (data = {}) => {
  return http.request({
    method: "GET",
    data,
    url: `${dataUrl}baseFactoryModeling/children`,
  });
};

// 根据车间编码获取线体列表
export const getLineList = (data = {}) => {
  return http.request({
    method: "GET",
    data,
    url: `${dataUrl}baseFactoryModeling/children`,
  });
};
// // 根据工单号获取工序
// export const getProcessList = (params) => {
//   return http.request({
//     method: "GET",
//     url: `${mesUrl}mesProdOrder/getProcessListByOrder`,
//     params,
//   });
// };
// 根据车间获取上料验证明细
export const getLoadVerification = (data = {}) => {
  return http.request({
    method: "GET",
    data,
    url: `${dataUrl}commonLoadVerfication/list`,
  });
};
//
// 模糊搜索工单
export const searchOrderList = (data) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScan/searchOrderList`,
    data,
    custom: { loading: true },
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
//news

// 获取工作日期
export const getWorkDate = (id) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesCommon/getWorkDate/${id}`,
    custom: { loading: true },
  });
};
// 工单-模糊搜索
export const getFuzzySearchOrderList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getFuzzySearchOrderList`,
    params,
    custom: { loading: false },
  });
};
// 筛选页面-查询
export const getMesProdOrderList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesLoadMaterialVerification/getMesProdOrderList`,
    data,
    custom: { loading: false },
  });
};
// 查询上料列表
export const queryOrder = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/queryOrder`,
    params,
    custom: { loading: false },
  });
};
// 获取工序信息
export const getProcessList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getProcessList`,
    params,
    custom: { loading: false },
  });
};
// 获取工单详情
export const queryDetail = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/queryDetail`,
    params,
    custom: { loading: false },
  });
};
// 物料模糊搜索
export const getFuzzySearchMaterialList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getFuzzySearchMaterialList`,
    params,
    custom: { loading: false },
  });
};
// 物料精确搜索
export const getAccurateMaterial = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getAccurateMaterial`,
    params,
    custom: { loading: false },
  });
};
// 条码模糊搜索
export const getFuzzySearchBarcodeList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getFuzzySearchBarcodeList`,
    params,
    custom: { loading: false },
  });
};
// 条码精确搜索
export const getAccurateBarcode = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getAccurateBarcode`,
    params,
    custom: { loading: false },
  });
};
// 领料单模糊搜索
export const getFuzzySearchPickingList = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getFuzzySearchPickingList`,
    params,
    custom: { loading: false },
  });
};
// 领料单精确搜索
export const getAccuratePickingNo = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesLoadMaterialVerificationPda/getAccuratePickingNo`,
    params,
    custom: { loading: false },
  });
};

// 扫描
export const scan = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesLoadMaterialVerificationPda/scan`,
    data,
    custom: { loading: true },
  });
};
// 退扫
export const backScan = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesLoadMaterialVerificationPda/backScan`,
    data,
    custom: { loading: true },
  });
};
// 完成验证
export const complete = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesLoadMaterialVerificationPda/complete`,
    data,
    custom: { loading: true },
  });
};
