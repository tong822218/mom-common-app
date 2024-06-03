<template>
  <view class="m-list-item-number-item" :style="{ height }" @click.native.stop="">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text :class="{ required }">{{ text }}</text>
      <text v-if="subText" class="text-333 ml10rpx">{{ subText }}</text>
    </view>
    <view class="flex flex-1 pl-52rpx center">
      <view class="icon-container">
        <u-image @click.native.stop="minus" src="../../images/icon_minus@2x.png" width="50rpx" height="50rpx" mode="widthFix"></u-image>
      </view>
      <u-input class="flex-1" type="number" v-bind="$attrs" @focus="focus" @blur="blur" v-on="$listeners" inputAlign="center"></u-input>
      <view class="icon-container">
        <u-image @click.native.stop="add" src="../../images/icon_plus@2x.png" width="50rpx" height="50rpx" mode="widthFix"></u-image>
      </view>
    </view>
  </view>
</template>

<script>
import AnyNumber from 'anynumber'

export default {
  name: 'MInputNumberItem',
  props: {
    // label
    text: String,
    textWidth: {
      type: String,
      default: 'auto'
    },
    // 副标题
    subText: String,
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
    }
  },
  data() {
    return {}
  },
  methods: {
    focus() {
      if (this.$attrs.value == 0) {
        this.$emit('input', '')
      }
    },
    blur() {
      if (this.$attrs.min !== undefined){
        if(this.$attrs.value < this.$attrs.min) {
          this.$emit('input', this.$attrs.min)
        }
      }
      if (this.$attrs.max !== undefined){
        if(this.$attrs.value > this.$attrs.max) {
          this.$emit('input', this.$attrs.max)
        }
      } 
    },
    minus() {
      if (this.$attrs.min !== undefined && AnyNumber(this.$attrs.value).subtract(1).value < this.$attrs.min){
        return
      }
      this.$emit('input', AnyNumber(this.$attrs.value).subtract(1).value)
    },
    add() {
      if (this.$attrs.max !== undefined && AnyNumber(this.$attrs.value).add(1).value > this.$attrs.max){
        return
      }
      this.$emit('input', AnyNumber(this.$attrs.value).add(1).value)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-item-number-item {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #f3f3f5;
  .icon-container {
    background-color: #f3f5fb;
    width: 48rpx;
    height: 48rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-image__image {
      width: 100%;
      height: 100%;
    }
  }
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
