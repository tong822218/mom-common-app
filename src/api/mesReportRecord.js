const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl } = baseUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

 //获取报工列表
 export const getMesScanRecord = (data) => {
   return http.request({
     method: "GET",
     url: `${mesUrl}mesReportRecord/getMesScanRecordPageLike`,
     data,
   });
 };

 export const getMesScanRecordDetail = (data) => {
   return http.request({
     method: "GET",
     url: `${mesUrl}mesReportRecord/getMesScanRecordDetailPage`,
     data,
   });
 };

