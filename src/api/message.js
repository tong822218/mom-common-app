const http = uni.$u.http;
import baseUrl from '@/axios/url';
const { adminUrl } = baseUrl();
/**
 * 参数说明
 * @param {String} method 请求方法必须大写[GET | POST | PUT | DELETE | CONNECT | HEAD | OPTIONS | TRACE]
 * @param {Object} custom 自定义参数 此次请求是否需要全局的loading 默认不需要
 **/

// 投递消息成功
export function deliveredMessage(messageId) {
  return http.request({
    url: `${adminUrl}message/delivered/${messageId}`,
    method: "PUT",
  });
}
// 阅读消息成功
export function readMessage(messageId) {
  return http.request({
    url: `${adminUrl}message/read/${messageId}`,
    method: "PUT",
  });
}
// 未读消息数
export function getUnreadNum() {
  return http.request({
    url: `${adminUrl}message/unreadNum`,
    method: "GET",
  });
}
// 查看已读未读消息
// 0 未读 1 已读
export function getMessageSend(params = {}) {
  return http.request({
    url: `${adminUrl}message/send`,
    method: "GET",
    params,
    custom: { loading: true },
  });
}
// 全部已读
export function messageReadAll() {
  return http.request({
    url: `${adminUrl}message/readAll`,
    method: "PUT",
  });
}
//删除
export function deletMessage(ids = "") {
  return http.request({
    url: `${adminUrl}message/send/${ids}`,
    method: "DELETE",
  });
}

// 获取标签页及数量
export function getWarnModuleList(params = "") {
  return http.request({
    url: `${adminUrl}message/getWarnModuleList/${params}`,
    method: "GET",
    custom: { loading: true },
  });
}

// 获取标签页及数量
export function getCommonWarnModule() {
  return http.request({
    url: `${adminUrl}dict/type/common_warn_module`,
    method: "GET",
    custom: { loading: true },
  });
}
// 获取标签页及数量
export function commonWarningReport(params = {}) {
  return http.request({
    url: `${adminUrl}common-pda/commonWarningReport`,
    method: "PUT",
    custom: { loading: true },
    data: params,
  });
}
