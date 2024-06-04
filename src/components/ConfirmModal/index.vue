<template>
  <u-overlay
    :show="show"
    :opacity="opacity"
    @click="tapModalClose && (show = false)"
  >
    <view class="center h-full">
      <view
        class="relative w550rpx bg-#FFF min-h-238rpx rounded-17rpx pt50rpx pb20rpx"
        @tap.stop
      >
        <!-- <u-icon size="50rpx" name="close" class="absolute top-25rpx right-25rpx"></u-icon> -->
        <view
          class="center text-pack p-l-20rpx p-r-20rpx text-#333 text-28rpx mb42rpx"
        >
          <slot>{{ content }}</slot>
        </view>
        <view class="center">
          <view class="btn-pack" v-if="showCancelBtn">
            <u-button
              class="padding-16"
              color="#F3F5FB"
              shape="circle"
              @tap="cancelClick"
              :customStyle="{ height: '67rpx', color: '#333333' }"
            >
              {{ btnText[0] }}
            </u-button>
          </view>
          <view class="mx33rpx btn-pack">
            <u-button
              type="primary"
              class="padding-16"
              shape="circle"
              @tap="confirmClick"
              :customStyle="{ height: '67rpx' }"
            >
              {{ btnText[1] }}
            </u-button>
          </view>
        </view>
      </view>
    </view>
  </u-overlay>
</template>

<script>
import i18n from "../../lang";
export default {
  name: "ConfirmModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "   ",
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    btnText: {
      type: Array,
      default: () => [$i18n.t("common.cancel"), $i18n.t("common.confirm")],
    },
    tapModalClose: {
      type: Boolean,
      default: false,
    },
    opacity: {
      type: Number,
      default: 0.3,
    },
  },
  data() {
    return {};
  },
  methods: {
    cancelClick() {
      this.$emit("cancel");
    },
    confirmClick() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped>
.text-pack {
  line-height: 40rpx;
}
.padding-16 {
  padding: 0px 24rpx;
}
.btn-pack {
  min-width: 125rpx;
}
</style>
