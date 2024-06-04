const http = uni.$u.http;
import baseUrl from "@/axios/url";
const { mesUrl } = baseUrl();

//根据主码获取主关件码
export const getKeypartsByBarcode = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}replaceKeyParts/getKeyPartsByBarcode`,
    data,
    custom: { loading: true },
  });
};

//主关件码解绑与重新绑定
export const replaceKeypart = (data) => {
  return http.request({
    method: "POST",
    url: `${mesUrl}replaceKeyParts/replaceKeyPart`,
    data,
    custom: { loading: true },
  });
};
