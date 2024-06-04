const http = uni.$u.http;
import adminUrl from "@/axios/url";
const { baseUrl } = adminUrl();
// const baseUrl = 'http://localhost:10101'
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//获取不良分类树
export const getCategoryTree = (data) => {
  return http.request({
    method: "get",
    url: `${baseUrl()}/common-service/commonDefectivePhenomenon/tree`,
    data,
    custom: { loading: true },
  });
};

//获取不良代码列表
export const getFaultLibraryAll = (data) => {
  return http.request({
    method: "POST",
    url: `${baseUrl()}/qms-pda/fault/getFaultLibraryAll`,
    data,
    custom: { loading: true },
  });
};
