const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { adminUrl } = baseUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/
//登录
export const refreshToken = `${adminUrl}/user/renew`;
export const login = (data) => {
  return http.request({
    method: "POST",
    url: `${adminUrl}user/login`,
    data, //post请求的数据
    custom: {
      loading: true,
    },
  });
};
//获取用户信息
export const getUserInfo = (params = {}) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}user/info`,
    params, //get请求的数据
    custom: {
      loading: true,
    },
  });
};
//修改用户信息
export const postUserEditmy = (data) => {
  return http.request({
    method: "POST",
    url: `${adminUrl}user/editmy`,
    data,
    custom: {
      loading: true,
    },
  });
};
//测试
export const postExposePing = (url, momTenant) => {
  return http.request({
    method: "GET",
    url: `${url}/expose/ping`,
    header: {
      "Mom-Tenant": momTenant,
    },
    custom: {
      loading: true,
    },
  });
};
//添加用户签名
export const setUserAutograph = (data) => {
  return http.request({
    method: "POST",
    url: `${adminUrl}wms-pda/wmsOutTaskSignature`,
    data,
    custom: {
      loading: true,
    },
  });
};
//查看用户签名
export const getUserAutograph = (data) => {
  return http.request({
    method: "POST",
    url: `${adminUrl}user/add`,
    data,
    custom: {
      loading: true,
    },
  });
};

// 国际化
export const getLanguage = (type,sysCodes) => {
  return http.request({
    method: "GET",
    url: `${adminUrl}expose/baseWordEntryConfig/loading?language=${type}&terminalType=1&sysCodes=${sysCodes}`,
  });
};
