<template>
  <view class="m-pop">
    <u-popup v-bind="$attrs" v-on="$listeners" :show="show" @close="close" :closeable="true">
      <view class="flex flex-col" :style="{ height }">
        <text class="pop-title text-5A6F82 text-28rpx center h100rpx">{{ title }}</text>
        <view class="flex flex-1 h0" ><slot></slot></view>
        <view class="h142rpx px50rpx center" v-if="showButtons" v-hide-on-keyboard-show>
          <m-button @click="close" v-if="showCancel" type="info" :customStyle="{ width: '100%', height: '75rpx', margin: '0 15rpx' }">{{ $t('momComponent.cancel') }}</m-button>
          <m-button @click="confirm" :customStyle="{ width: '100%', height: '75rpx', margin: '0 15rpx' }">{{ confirmText }}</m-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MSearch from '../MSearch'
import MList from '../MList'
import MButton from '../MButton'
export default {
  name: 'MSearchPop',
  components: { MSearch, MList, MButton },
  props: {
    api: {
      type: Function,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    },
    showScan: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: i18n.t('mesProcessCode.confirm')
    },
    searchKey: {
      type: String,
      default: 'userName'
    },
    height: {
      type: String,
      default: '60vh'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showButtons: {
      type: Boolean,
      default: true
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchValue: '',
      loadMoreStatus: 'loadmore',
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      list: []
    }
  },
  computed: {},
  created() {},
  watch: {
    show(val) {
      this.disableOverlayNoScrollDom(val)
    }
  },
  methods: {
    toMoveHandle(){},
    // 用于解决弹窗出现时，页面滚动被禁用的问题
    disableOverlayNoScrollDom(val) {
      document.querySelector('body').style.overflow = val ? 'hidden' : 'auto'
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang="scss">
.m-pop {
  ::v-deep .u-popup__content {
    border-radius: 17rpx 17rpx 0rpx 0rpx;
  }

  .pop-title {
    border-bottom: 1rpx solid #f3f3f5;
  }
}
</style>
