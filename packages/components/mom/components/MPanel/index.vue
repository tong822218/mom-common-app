<template>
  <view class="m-panel">
    <view class="m-panel-header between-center h70rpx pr33rpx flex">
      <view class="m-panel-header-title text-333 text-28rpx mr-auto" v-on="$listeners">
        <slot name="title">{{ title }}</slot>
      </view>
      <view class="m-panel-header-status text-25rpx" v-if="showStatus">
        <view class="text-25rpx" :style="{ color: statusColor }">{{ statusName }}</view>
      </view>
      <view class="flex ml20rpx" :class="{ transform: isExpand }" v-if="showExpand">
        <u-image @click="expand" src="../../images/icon_unfold@2x.png" width="33rpx" height="33rpx" mode="widthFix"></u-image>
      </view>
    </view>
    <view class="m-panel-content" v-show="isExpand || !showExpand">
      <slot></slot>
      <view class="center py17rpx" v-if="isExpand || showExpand">
        <view class="up center" @click="expand">收起</view>
      </view>
    </view>
  </view>
</template>

<script>
import MListItem from '../MListItem'
export default {
  name: 'MPanel',
  components: { MListItem },
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    showExpand: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: false
    },
    // 状态
    statusName: String,
    // 状态颜色
    statusColor: {
      type: String,
      default: '#999999'
    }
  },
  data() {
    return {
      isExpand: false
    }
  },
  methods: {
    expand() {
      this.isExpand = !this.isExpand
    }
  }
}
</script>

<style lang="scss" scoped>
.m-panel {
  background: #fff;
  .transform {
    transform: rotate(180deg);
  }
  .up {
    width: 83rpx;
    height: 50rpx;
    background: #f3f5fb;
    border-radius: 25rpx 25rpx 25rpx 25rpx;
    opacity: 1;
    font-size: 25rpx;
    font-family: Noto Sans S Chinese, Noto Sans S Chinese;
    font-weight: 400;
    color: #5a6f82;
    line-height: 25rpx;
  }
  .m-panel-header-title {
    position: relative;
    display: flex;
    align-items: center;
    font-weight: 500;
    flex: 1;
    width: 0;

    &::before {
      content: '';
      width: 17rpx;
      height: 25rpx;
      background: #00b39b;
      margin-right: 17rpx;
      border-radius: 0rpx 4rpx 4rpx 0rpx;
    }
  }
}
</style>
