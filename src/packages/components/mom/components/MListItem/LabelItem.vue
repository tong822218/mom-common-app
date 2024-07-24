<template>
  <view class="m-list-item-label-item" :style="{ height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text>{{ text }}</text>
      <text v-if="subText" class="text-333 ml10rpx">{{ subText }}</text>
    </view>
    <view class="flex flex-1 text-333 text-28rpx w0" :style="{ textAlign }">
      <text class="flex-1 w0 overflow-ellipsis" v-if="!$slots.value">{{ value }}</text>
      <text v-if="subValue && !$slots.value" class="text-999">({{ subValue }})</text>
      <slot name="status"></slot>
      <slot name="value"></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MLabelItem',
  props: {
    textWidth: {
      type: String,
      default: 'auto'
    },
    // label
    text: String,
    textAlign: {
      type: String,
      default: 'right'
    },
    // 副标题
    subText: String,
    // value
    value: {
      type: [String, Number],
      default: ''
    },
    // 副value 张三(21020231)
    subValue: String,
    height: {
      type: String,
      default: '80rpx'
    },
    bottomLine: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  created() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item-label-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
