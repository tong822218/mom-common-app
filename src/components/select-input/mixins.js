export const config = {
  props: {
    shape: {
      type: String,
      default: "circle",
    },
    //类型
    type: {
      type: String,
      default: "select",
    },
    //label 宽度
    labelWidth: {
      type: String | Number,
      default: 0,
    },
    // input  插入 placeholder
    placeholder: {
      type: String,
      default: "",
    },
    // 插入的class方便调整,input样式
    className: {
      type: String,
      default: "input-pack",
    },
    // 左侧label  默认不显示
    label: {
      type: String,
      default: "",
    },
    // 传入的的参数, 两种方式, 一种方法, 一宗直接返回数据
    getList: {
      type: Function | Array,
    },
    //弹窗数据需要传递的参数
    initForm: {
      type: Object,
      default: () => ({}),
    },
    // v-model 数据
    dataValue: {
      type: String | Number,
      default: "",
    },
    // select 内, 展示的内容, 的键
    labelKey: {
      type: String,
      default: "label",
    },
    // select 内, 需要绑定的值,的键
    valueKey: {
      type: String,
      default: "value",
    },
    labelFormat: {
      type: String,
      default: "yyyy-mm-dd hh:MM",
    },
  },
};
