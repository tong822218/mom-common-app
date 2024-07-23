import i18n from "./index";
import store from "@/store";
import zn from "@/lang/zh.json";
import en from "@/lang/en.json";
import { getLanguage } from "@/api/login.js";
import merge from "lodash.merge";

export function loadLanguageAsync() {
  const loclLang = uni.getStorageSync('lang')
  if(!loclLang) uni.setStorageSync('lang', 'zh-Hans')
  const lang = store.getters.language;
  i18n.locale = lang;
  uni.showLoading({
    title: lang == en ? "loading..." : "加载中",
    mask: true,
  });
  // uni.setLocale(lang);
  return new Promise(async (resolve, reject) => {
    uni.hideLoading();
    const LANGUAGE = [
      {
        key: "en",
        default: en,
        value: 0,
      },
      {
        key: "zh-Hans",
        default: zn,
        value: 1,
      },
    ];
    //   动态选择插入国际化文件,查找不到默认显示中文
    let langItem = LANGUAGE.find((ite) => ite.key == lang) || {
      key: "zh-Hans",
      default: zn,
      value: 1,
    };
    //   获取线上配置
    let result = await getLanguageApi(langItem.value);
    const langConfig = merge({}, langItem.default, result?.['mes'] || {});
    i18n.mergeLocaleMessage(lang, langConfig);
    resolve({ success: true, lang });
  });
}
// 获取国际化配置信息
export const getLanguageApi = async (type, sysCodes = "mes") => {
  try {
    let res = await getLanguage(type, sysCodes);
    return res.data.result;
  } catch (error) {
    console.error("获取国际化信息报错", error);
    return {};
  }
};
