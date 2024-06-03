<template>
  <view class="m-list-item-radio-item" :style="{ height, borderBottom: bottomLine ? 'solid 1px #f3f3f5' : 'none' }">
    <view class="flex text-5A6F82 text-28rpx" :style="{ width: textWidth }">
      <text :class="{ required }">{{ text }}</text>
      <text v-if="subText" class="text-333 ml10rpx">{{ subText }}</text>
    </view>
    <view class="flex flex-1 pl-52rpx center">
      <u-radio-group v-bind="$attrs" v-on="$listeners" placement="row">
        <u-radio :label="item.label" :name="item.value" v-for="item in options" class="mx15rpx"></u-radio>
      </u-radio-group>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MRadioItem',
  props: {
    textWidth: {
      type: String,
      default: 'auto'
    },
    // label
    text: String,
    // 副标题
    subText: String,
    // 副value 张三(21020231)
    subValue: String,
    height: {
      type: String,
      default: '83rpx'
    },
    options: {
      type: Array,
      default: () => []
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
    return { choseVal: '' }
  },
  watch: {
    options: {
      handler(val) {
        setTimeout(() => {
          this.$emit('input', val[0].value)
        }, 100)
      },
      immediate: true
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-list-item-radio-item {
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
  }
}
</style>
