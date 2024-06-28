<template>
  <view class="m-list-item-select-item" :style="{ height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text :class="{ required }">{{ text }}</text>
    </view>
    <view class="flex flex-1 text-333 text-28rpx items-center justify-center" @click="$listeners.click">
      <view class="flex flex-1" :style="valueStyle">
        <text class="">{{ value }}</text>
        <text v-if="subValue" class="text-999">({{ subValue }})</text>
      </view>
      <u-image src="../../images/icon_arr_48@2x.png" width="50rpx" height="50rpx" mode="widthFix"></u-image>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MSelectItem',
  props: {
    textWidth: {
      type: String,
      default: '186rpx'
    },
    // label
    text: String,
    textAlign: {
      type: String,
      default: 'left'
    },
    valueAlign: {
      type: String,
      default: 'right'
    },
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
    valueStyle() {
      return {
        justifyContent: this.valueAlign === 'left' ? 'flex-start' : this.valueAlign === 'center' ? 'center' : 'flex-end'
      }
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item-select-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #f3f3f5;
  .required {
    &::before {
      color: red;
      content: '*';
      width: 8rpx;
      height: 8rpx;
    }
  }
}
</style>
