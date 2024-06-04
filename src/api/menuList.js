const http = uni.$u.http;
// import baseUrl from '@/axios/url';
// const { adminUrl } = baseUrl();
import localUrl from "@/axios/url";
const { mesUrl, adminUrl } = localUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

//菜单
export const getResourcesApp = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}user/resources/app`,
    custom: { loading: true },
  });
};

//获取常用功能菜单列表
export const getCommonlyMenus = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}resource/visit/commonly`,
    custom: { loading: true },
  });
};
//点击菜单事件上传服务端
export const recordVisit = (id) => {
  return http.request({
    method: "PUT",
    url: `${adminUrl}resource/visit/${id}`,
  });
};
//获取所有工厂
export const getFactories = () => {
  return http.request({
    method: "GET",
    url: `${adminUrl}user/factories`,
  });
};
//切换工厂
export const changeFactory = (code) => {
  return http.request({
    method: "PUT",
    url: `${adminUrl}user/factory/${code}`,
  });
};
//查询工单列表
export const getMesProdOrderList = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}mesScan/getMesProdOrderList`,
    data,
    custom: { loading: true },
  });
};
//获取资源水印
export const watermarkConfig = () => {
  return http.request({
    url: `${adminUrl}baseResourceWatermark/watermarkConfig?terminalType=1`,
    method: "get",
  });
}
