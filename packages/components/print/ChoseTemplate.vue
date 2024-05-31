<template>
  <u-popup :show="show" :round="10">
    <view class="flex flex-col h-85vh px40rpx z" @touchmove.stop.prevent="() => {}">
      <view class="flex h-96rpx justify-between text-333 text-14px">
        <view class="center" @click="cancel">取消</view>
        <view class="center" @click="confirm">打印/确定</view>
      </view>
      <view class="flex-1 h0 pb20rpx">
        <view class="center h400rpx" v-if="loading"> <u-loading-icon></u-loading-icon> </view>
        <u-radio-group :value="curTemplateIn.tempCode" style="height: 100%" v-else-if="templateList && templateList.length">
          <u-list height="100%">
            <u-list-item class="flex flex-col" v-for="(item, index) in templateList" :key="index">
              <view @click.prevent.stop="templateClick(item)">
                <u-radio :customStyle="{ marginBottom: '8px' }" :label="item.tempName" :name="item.tempCode" @change="templateClick(item)"></u-radio>
                <view
                  class="border-1 border-333 border-solid h300rpx mb40rpx"
                  :style="{
                    backgroundImage: `url(${item.tempThumb})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'norepeat'
                  }"
                ></view>
              </view>
            </u-list-item>
          </u-list>
        </u-radio-group>
        <view class="center h400rpx" v-else> 暂无数据 </view>
      </view>
    </view>
  </u-popup>
</template>
<script>
export default {
  name: 'ChoseTemplate',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    curTemplate: {
      type: Object,
      default: () => {}
    },
    templateList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curTemplateIn: {}
    }
  },
  watch: {
    curTemplate: {
      handler(newVal) {
        this.curTemplateIn = newVal
      },
      immediate: true
    }
  },

  methods: {
    radioChange(item) {
      console.log(item)
    },
    templateClick(item) {
      console.log(item)
      this.curTemplateIn = item
      // this.$emit('change', item)
    },
    groupChange(item) {
      console.log(item)
      this.$emit('change', item)
    },
    cancel() {
      this.$emit('cancel', false)
    },
    confirm() {
      console.log(this.curTemplateIn)
      this.$emit('confirm', this.curTemplateIn)
    }
  }
}
</script>
<style lang="scss" scoped>
.zindex-20000 {
  position: relative;
  z-index: 20000;
}
</style>
