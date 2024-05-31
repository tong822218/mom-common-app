<template>
  <view class="m-list-item-textarea-item">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth,height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
      <text :class="{ required }">{{ text }}</text>
    </view>
    <view class="flex flex-1 pt17rpx">
      <u-textarea v-bind="$attrs" v-on="$listeners" :value="value" :placeholder="`输入${text}`"></u-textarea>
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
    // value
    value: String,
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item-textarea-item {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 32rpx;
  flex-direction: column;
  justify-content: center;
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
  }
}
</style>
