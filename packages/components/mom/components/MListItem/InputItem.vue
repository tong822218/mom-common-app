<template>
  <view class="m-list-item-input-item" :style="{ height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text :class="{ required }">{{ text }}</text>
      <text v-if="subText" class="text-333 ml10rpx">{{ subText }}</text>
    </view>
    <view class="flex flex-1 pl-52rpx">
      <u-input :fontSize="$attrs.fontSize || '28rpx'" v-bind="$attrs" v-on="$listeners" :value="value" :placeholder="placeholder"></u-input>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MInputItem',
  props: {
    // label
    text: String,
    textWidth: {
      type: String,
      default: 'auto'
    },
    // 副标题
    subText: String,
    // value
    value: String,
    // 副value 张三(21020231)
    subValue: String,
    height: {
      type: String,
      default: '83rpx'
    },
    // 是否必填
    required: {
      type: Boolean,
      default: false
    },
    bottomLine: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    placeholder() {
      return this.$attrs.placeholder || `输入${this.text}`
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item-input-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .required {
    &::before {
      color: red;
      content: '*';
      width: 8rpx;
      height: 8rpx;
    }
  }
  ::v-deep .u-input {
    border: none;
    font-size: 28rpx;
  }
}
</style>
