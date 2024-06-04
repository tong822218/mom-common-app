import Vue from 'vue';
import store from '@/store';
import VueI18n from 'vue-i18n';
import zn from '@/lang/zn.js';
import en from '@/lang/en.js';
Vue.use(VueI18n); // 全局注册国际化包
// 准备翻译的语言环境信息
const i18n = new VueI18n({
    locale: store.getters.language, // 初始化中文zn
    messages: {
        "zh-Hans": { ...zn },
        en: { ...en },
    },
});
uni.$i18n = i18n;
window.$i18n = i18n;
export default i18n;
