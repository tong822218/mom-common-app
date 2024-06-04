const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { baseUrl } = adminUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//获取计划、实际、差异、不良数据
export const getProcessData = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getCheckScanPageList`,
    data,
  });
};

//扫描主码
export const scanMainBarCode = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/scanMainBarCode`,
    data,
    custom: { loading: true },
  });
};
//扫描主关件
export const scanKeyPartCode = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/scanKeyPartCode`,
    data,
    custom: { loading: true },
  });
};

//提交主码与主关件码
export const submitProcessScan = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/submitProcessScan`,
    data,
    custom: { loading: true },
  });
};

//提交缺陷列表
export const submitMesCheckRecordList = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/submitMesCheckRecordList`,
    data,
    custom: { loading: true },
  });
};
//获取检验列表
export const getMesCheckRecord = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getMesCheckRecord`,
    data,
    custom: { loading: true },
  });
};
//获取检验结果
export const getCheckScan = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/getCheckScan`,
    data,
  });
};
//判断是否已扫描
export const checkMainBarCode = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesCheckScan/checkMainBarCode`,
    data,
  });
};
