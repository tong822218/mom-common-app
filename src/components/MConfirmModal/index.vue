<template>
  <u-modal style="flex: 0" :show="show" negativeTop="100" :showConfirmButton="false">
    <view class="flex flex-col w-full">
      <view class="center mb42rpx text-29rpx text-#333 relative">
        <text>{{ title }}</text>
        <u-icon name="close" class="absolute top-[-10rpx] right-0" @click="closeClick" color="#000" size="18"></u-icon>
      </view>
      <slot></slot>
      <slot name="buttons">
        <view class="center mt42rpx text-29rpx">
          <view class="w125rpx">
            <u-button color="#F3F5FB" shape="circle" @tap="cancelClick" :customStyle="{ height: '67rpx', color: '#333333' }">取消</u-button>
          </view>
          <view class="w125rpx mx33rpx">
            <u-button type="primary" shape="circle" @tap="confirmClick" :customStyle="{ height: '67rpx' }">确认</u-button>
          </view>
        </view>
      </slot>
    </view>
  </u-modal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    confirmClick() {
      this.$emit('confirm')
    },
    cancelClick() {
      this.$emit('cancel')
    },
    closeClick(){
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped></style>
