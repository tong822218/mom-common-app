<template>
  <view class="m-card bg-#fff py-33rpx text-#333 text-29rpx">
    <view class="card-header" :class="{ 'left-icon': showLeftIcon }" @click="collapseHandler">
      
      <view class="w-full between-center pr33rpx">
        <slot name="header">
          
          <view class="pl33rpx text-#333 text-30rpx font-bold mr-auto">{{ title }}</view>
        </slot>
        <view class="end-center">
          <view v-if="status" class="text-#5A6F82">{{ status }}</view>
          <u-image
            v-if="collapse"
            class="ml-8rpx"
            :style="{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }"
            src="../../images/icon_arr_32@2x.png"
            width="33rpx"
            height="33rpx"
            mode="widthFix"
          />
        </view>
      </view>
    </view>
    <slot v-if="open || !collapse"></slot>
  </view>
</template>

<script>
export default {
  name: 'MCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    showLeftIcon: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  },
  methods: {
    collapseHandler() {
      if (!this.collapse) return
      this.$emit('change', !this.open)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-header {
  position: relative;
  display: flex;
  align-items: center;
  &.left-icon {
    &::before {
      content: ' ';
      width: 17rpx;
      height: 25rpx;
      background: #00b39b;
      border-radius: 0rpx 4rpx 4rpx 0rpx;
      position: absolute;
      left: 0;
    }
  }
}
</style>
