const http = uni.$u.http;
import url from "@/axios/url";
const { adminUrl, mesUrl } = url();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 获取当前人员默认信息
export const getUserExtendInfoNew = (data) => {
  return http.request({
    method: "get",
    url: `${mesUrl}mesUserExtend/getListByCode`,
    data,
    custom: { loading: true },
  });
};

//查询人员信息扩展表列表
export const getUserinfo = (data) => {
  return http.request({
    method: "get",
    url: `${mesUrl}mesUserExtend/getExtendList`,
    data,
    custom: { loading: true },
  });
};
//根据工单号查询返工返修物料
export const getRepairListByOrderCode = (data) => {
  return http.request({
    method: "post",
    // url: `http://localhost:10101/mes-pda/mesRepairScan/getRepairListByOrderCode`,
    url: `${mesUrl}mesRepairScan/getRepairListByOrderCode`,
    data,
    custom: { loading: true },
  });
};
//根据不良扫描id,不良工序编码，返修工序编码 获取返修工序及各返修工序返修数量、设备
export const getRepairProcess = (data) => {
  return http.request({
    method: "post",
    // url: `http://localhost:10101/mes-pda/mesRepairScan/getRepairProcess`,
    url: `${mesUrl}mesRepairScan/getRepairProcess`,
    data,
    custom: { loading: true },
  });
};
//根据不良扫描id获取该工单的（返修工序及之前的工序）及各返修工序返修数量、设备
export const getRepairProcessForOrder = (data) => {
  return http.request({
    method: "post",
    // url: `http://localhost:10101/mes-pda/mesRepairScan/getRepairProcessForOrder`,
    url: `${mesUrl}mesRepairScan/getRepairProcessForOrder`,
    data,
    custom: { loading: false },
  });
};
//返修扫描提交-批次
export const submitRepairScanPC = (data) => {
  return http.request({
    method: "post",
    // url: `http://localhost:10101/mes-pda/mesRepairScan/submitRepairScanPC`,
    url: `${mesUrl}mesRepairScan/submitRepairScanPC`,
    data,
    custom: { loading: true },
  });
};
//返修扫描提交-工单报工-统一报工
export const submitRepairScanUnite = (data) => {
  return http.request({
    method: "post",
    // url: `http://localhost:10101/mes-pda/mesRepairScan/submitRepairScanUnite`,
    url: `${mesUrl}mesRepairScan/submitRepairScanUnite`,
    data,
    custom: { loading: true },
  });
};
// 获取生产工单列表
export const getMesProdOrderList = (data = {}) => {
  return http.request({
    method: "POST",
    data,
    url: `${mesUrl}mesLoadMaterialVerification/getMesProdOrderList`,
    // url: `http://localhost:10101/mes-pda/mesLoadmaterialVerification/getMesProdOrderList`,
  });
};
// 根据工位获取设备
export const getEquipmentList = (params) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}commonBaseEquipment`,
    // url: `http://localhost:10000/common-service/commonBaseEquipment`,
    params,
  });
};

