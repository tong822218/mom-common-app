const http = uni.$u.http;
import url from "@/axios/url";
const { mesUrl, adminUrl } = url();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
//获取计划数据
export const getProcessDataPC = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProcessScan/getProcessScanPageListPC`,
    // url: `http://localhost:10101/mes-pda/mesProcessScan/getProcessScanPageListPC`,
    data,
    custom: { loading: true },
  });
};

//获取不良分类树
export const getCategoryTree = (data) => {
  return http.request({
    method: "get",
    url: `${adminUrl}commonDefectivePhenomenon/tree`,
    data,
    custom: { loading: true },
  });
};

//前工序扫描提交
export const submitProcessScanPC = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesProcessScan/submitProcessScanPC`,
    // url: `http://localhost:10101/mes-pda/mesProcessScan/submitProcessScanPC`,
    data,
    custom: { loading: true },
  });
};

//工装使用次数累加
export const updateFrockCount = (data) => {
  return http.request({
    method: "PUT",
    url: `${adminUrl}commonExtensionFrock/updateFrockCount`,
    // url: `http://localhost:10101/mes-pda/mesExtensionFrock/updateFrockCount`,
    data,
    custom: { loading: true },
  });
};
