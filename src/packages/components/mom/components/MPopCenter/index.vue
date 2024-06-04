<template>
  <u-popup
    mode="center"
    :show="show"
    @close="close"
    :closeOnClickOverlay="false"
    :safeAreaInsetBottom="true"
    closeable
    :round="10"
    :customStyle="{ width: '90%'}"
  >
    <view class="flex flex-col p50rpx">
      <view class="text-center text-#333 text-30rpx mb42rpx">{{ title }}</view>
      <slot></slot>
      <view class="flex justify-center mt42rpx" v-if="showButton">
        <m-button v-if="showCancel" :text="cancelText" color="#F3F5FB" @click="close" :customStyle="{ padding:'19rpx 33rpx',height:'auto',color:'#333'}"></m-button>
        <m-button v-if="showConfirm" :text="confirmText" @click="confirm" class="ml25rpx" :customStyle="{ padding:'19rpx 33rpx',height:'auto',marginLeft:'25rpx'}"></m-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
import MButton from '../MButton'

export default {
  name: 'MPopCenter',
  components: { MButton },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showButton: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '提示'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm(){
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped></style>
