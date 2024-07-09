<template>
  <view class="m-list-item px33rpx">
    <template v-if="edit">
      <img-list :edit="edit" :text="text" :maxCount="maxCount" v-bind="$attrs" v-on="$listeners" v-if="type == 'img'"></img-list>
      <input-number-item :textWidth="textWidth" v-else-if="type == 'number'" :text="text" v-bind="$attrs" v-on="$listeners" :value="value" />
      <radio-item
        v-else-if="type == 'radio'"
        :textWidth="textWidth"
        :text="text"
        :options="options"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
      ></radio-item>
      <select-item
        v-else-if="type == 'select'"
        :textWidth="textWidth"
        :textAlign="textAlign"
        :text="text"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :subValue="subValue"
      ></select-item>
      <date-time-item
        v-else-if="type == 'datetime'"
        :textWidth="textWidth"
        :text="text"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
      ></date-time-item>
      <text-area-item :text="text" v-else-if="type == 'textarea'" :textWidth="textWidth" v-bind="$attrs" v-on="$listeners"></text-area-item>
      <input-item :textWidth="textWidth" :text="text" :value="value" v-bind="$attrs" v-on="$listeners" v-else></input-item>
    </template>
    <template v-else>
      <img-list :edit="edit" :text="text" :maxCount="maxCount" :value="value" v-if="type == 'img'"></img-list>
      <label-item
        :text="text"
        :textWidth="textWidth"
        :textAlign="textAlign"
        :value="value"
        :subText="subText"
        :subValue="subValue"
        :placeholder="$attrs.placeholder"
        :height="height"
        v-bind="$attrs"
        v-on="$listeners"
        v-else
      >
        <template slot="status"><slot name="status"></slot></template>
        <template slot="value"><slot name="value"></slot></template>
      </label-item>
    </template>
  </view>
</template>

<script>
import LabelItem from './LabelItem.vue'
import InputItem from './InputItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import ImgList from './ImgList.vue'
import RadioItem from './RadioItem.vue'
import SelectItem from './SelectItem.vue'
import DateTimeItem from './DateTimeItem.vue'
import TextAreaItem from './TextAreaItem.vue'
export default {
  name: 'MListItem',
  components: { ImgList, LabelItem, InputItem, InputNumberItem, RadioItem, SelectItem, DateTimeItem, TextAreaItem },
  props: {
    // 左侧label宽度
    textWidth: {
      type: String,
      default: 'auto'
    },
    // 主标题
    text: String,
    // 副标题
    subText: String,
    // 右侧主value
    value: {
      type: [String, Number],
      default: ''
    },
    // 副value 张三(21020231)
    subValue: String,
    // 是否编辑模式
    edit: {
      type: Boolean,
      default: false
    },
    // 类型，目前支持 text,img，number,radio，textArea，select,datetime
    type: {
      type: String,
      default: 'text'
    },
    // item高度
    height: {
      type: String,
      default: '80rpx'
    },
    // 最多支持图片数量
    maxCount: {
      type: Number,
      default: 5
    },
    // radio选项
    options: {
      type: Array,
      default: () => []
    },
    // 默认值
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    // value对齐方式
    textAlign: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item {
  width: 100%;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
}
</style>
