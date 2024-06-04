import waterMask from "./index.vue";

export default {
  install(Vue) {
    // 等待vue实例化
    setTimeout(() => {
      // 创建构造器
      var Profile = Vue.extend(waterMask);
      //生成已经创建的实例
      let dom = new Profile({ el: document.createElement("div") });
      //利用原生dom方法，将dom插入到body中
      document.body.appendChild(dom.$el);
    });
  },
};
