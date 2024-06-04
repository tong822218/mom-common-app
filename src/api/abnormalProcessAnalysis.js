const http = uni.$u.http;
import url from "@/axios/url";
const { adminUrl,mesUrl } = url();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
// const baseUrl = 'http://10.10.7.41:10100'

// 获取顶部卡片四个数据
export const getRecordData = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScanRecordDefective/recordData`,
    params,
    custom: { loading: true },
  });
};

// 获取图表数据
export const getChartData = (params) => {
  return http.request({
    method: "GET",
    url: `${mesUrl}mesScanRecordDefective/allList`,
    params,
    custom: { loading: true },
  });
};
