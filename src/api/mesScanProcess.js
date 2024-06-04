const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { baseUrl } = adminUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//获取计划数据
export const getProcessData = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/getProcessScanPageList`,
    data,
    custom: { loading: true },
  });
};

//获取采集记录
export const getRecord = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/selectRecordList`,
    data,
    custom: { loading: true },
  });
};

//扫描主码
export const scanMainBarCode = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/scanMainBarCode`,
    // url: `http://localhost:10101/mes-pda/mesProcessScan/scanMainBarCode`,
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
//获取扫描数量、合格数量、不合格数量
export const getQty = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/mes-pda/mesProcessScan/getQty`,
    // url: `http://localhost:10101/mes-pda/mesProcessScan/getQty`,
    data,
    custom: { loading: true },
  });
};

//查询人员信息扩展表列表
export const getUserinfo = (data) => {
  return http.request({
    method: "get",
    url: `${baseUrl()}/mes-service/mesUserExtend/getExtendList`,
    // url: `http://localhost:10101/mes-pda/mesProcessScan/getQty`,
    data,
    custom: { loading: true },
  });
};
