<template>
  <view class="m-list-item-datetime-item" :style="{ height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text :class="{ required }">{{ text }}</text>
    </view>
    <view class="flex flex-1 text-333 text-28rpx items-center justify-center" :style="{ textAlign }" @click="open">
      <view class="flex flex-1">
        <text class="">{{ value }}</text>
      </view>
      <u-image src="../../images/icon_arr_48@2x.png" width="50rpx" height="50rpx" mode="widthFix"></u-image>
    </view>
    <view>
      <u-datetime-picker :show="show" v-model="dateTime" @cancel="cancel" v-bind="$attrs" @confirm="ok" mode="datetime"></u-datetime-picker>
    </view>
  </view>
</template>

<script>
import * as dayjs from 'dayjs'
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
    value: {
      type: [String, Number],
      default: ''
    },
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
    return {
      show: false,
      dateTime: Number(new Date())
    }
  },
  created() {
    // this.dateTime = this.value
  },
  methods: {
    open() {
      console.log(22)
      this.show = true
    },
    ok(val) {
      const formatVal = dayjs(val.value).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('change', formatVal)
      this.show = false
    },
    cancel() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-item-datetime-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
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
