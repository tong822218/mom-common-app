const http = uni.$u.http;
import localUrl from "@/axios/url";
const { adminUrl, mesUrl } = localUrl();

/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
// const baseUrl = 'http://127.0.0.1:10100'
// 车间建模不分页查询
export const areaList = (params = {}) => {
  return http.request({
    method: "POST",
    url: `${adminUrl}base/coArea/list`,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    params,
    custom: { loading: true },
  });
};
// 根据工站查询ESOP列表
export const esopPadList = (params = {}) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}esopInfo/padList`,
    params,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    custom: { loading: true },
  });
};
// 根据工站查询ESOP列表
export const esopList = (data) => {
  console.log(data);
  return http.request({
    method: "POST",
    url: `${mesUrl}esopInfo/list`,
    data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    custom: { loading: true },
  });
};
// 获取文件查看地址
export const fileView = (params = "") => {
  return http.request({
    method: "GET",
    url: `${mesUrl}coFile/view/${params}`,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    // custom: { loading: true },
  });
};
// 获取Excel文件查看地址
export const fileViewExcel = (params = "") => {
  return http.request({
    method: "GET",
    url: `${mesUrl}coFile/viewExcel/${params}`,
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    custom: { loading: true },
  });
};
