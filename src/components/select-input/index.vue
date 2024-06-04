<!--  -->
<template>
  <view class="select-search-input">
    <view @click="showDialg()" :class="className">
      <slot :data="$data">
        <view class="flex-j-s-b">
          <view
            v-if="label"
            class="label"
            :style="{ width: labelWidth ? `${labelWidth}px` : 'auto' }"
          >
            <text>{{ label }}</text>
          </view>
          <u-input
            fontSize="13"
            :placeholder="placeholder ? placeholder : `请选择${label}`"
            :shape="shape"
            clearable
            v-model="name"
            readonly
            v-bind="{ ...$attrs, ...$props }"
            v-on="$listeners"
          >
            <u-icon
              name="arrow-right"
              color="#CDCDCD"
              size="24"
              slot="suffix"
            ></u-icon> </u-input></view></slot
    ></view>

    <!-- 单选下拉选择器 -->
    <select-search
      v-if="type == 'select'"
      @confirm="handleSelect"
      v-model="show"
      :data="processList"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
      @closeInput="closeInput"
    ></select-search>

    <!-- 时间选择器 -->
    <u-datetime-picker
      v-if="type == 'date'"
      :show="show"
      v-model="nowDate"
      mode="datetime"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
      @confirm="chooseStartTime"
      @cancel="show = false"
    ></u-datetime-picker>
  </view>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

import { config } from "./mixins.js";
export default {
  name: "select-search-input",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  mixins: [config],
  model: {
    prop: "dataValue",
    event: "setValue",
  },
  data() {
    //这里存放数据
    return {
      name: "",
      show: false,
      processList: [],
      nowDate: null, //时间
    };
  },

  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 监听,默认接口默认传参
    initForm: {
      handler(val, old) {
        if (this.type == "date") {
          return;
        }
        this.getSelectList();
      },
      deep: true,
      immediate: true,
    },
    dataValue: {
      handler(val, old) {
        this.$emit("setValue", val);

        this.setName(this.processList);
      },
      deep: true,
      immediate: true,
    },
  },
  //方法集合
  methods: {
    // 设置时间
    setDate(value) {
      this.nowDate = value;
      let date = uni.$u.timeFormat(value, this.labelFormat);
      this.name = date;
    },
    chooseStartTime(data) {
      this.$emit("setValue", data.value);
      this.setDate(data.value);
      this.$nextTick(() => {
        this.$emit("onSelect", data.value || "");
      });

      this.show = false;
    },
    // 选择单条数据回显
    handleSelect(data) {
      this.name = data[this.labelKey] || "";
      this.$emit("setValue", data[this.valueKey] || "");

      this.$nextTick(() => {
        this.$emit("onSelect", data);
      });
    },
    // 弹窗
    showDialg() {
      this.show = true;
      // this.getSelectList();
    },
    // 获取数据
    async getSelectList() {
      let res =
        typeof this.getList == "function"
          ? await this.getList(this.initForm)
          : { data: { result: this.getList } };

      this.setName(res.data.result);
      this.processList = res.data.result;
    },
    // 赋值名字
    setName(list) {
      if (this.type == "date") {
        this.setDate(this.dataValue || Number(new Date()));
      } else {
        //赋值name
        if (this.dataValue || this.dataValue === 0 || this.dataValue === "0") {
          let obj = list.find((ite) => {
            return ite[this.valueKey] == this.dataValue;
          });
          this.name = obj ? obj[this.labelKey] || "" : this.closeInput();
        } else {
          this.name = "";
        }
      }
    },
    // 获取名字
    getName() {
      return this.name;
    },
    // 清空
    closeInput() {
      this.name = "";
      this.$emit("setValue", "");
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style scoped lang="scss">
.select-search-input {
  // width: 100%;
  flex: 1;
  .flex-j-s-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .label {
    padding-right: 3%;
  }
}
</style>
