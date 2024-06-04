<!-- 滚动组件 -->
<template>
  <view class="notice-bar" :style="{ '--padding': padding }">
    <u-notice-bar
      v-bind="{ ...$attrs, ...$props }"
      :icon="null"
      :text="listToStr(list)"
      speed="50"
      @click="open"
      bgColor="#fff"
      mode="more"
      :rollLive="true"
      color="#484747"
    ></u-notice-bar>

    <u-popup
      :safeAreaInsetBottom="true"
      :safeAreaInsetTop="true"
      :mode="popupData.mode"
      :show="show"
      :round="popupData.round"
      :overlay="popupData.overlay"
      :borderRadius="popupData.borderRadius"
      :closeable="popupData.closeable"
      :closeOnClickOverlay="popupData.closeOnClickOverlay"
      @close="close"
      @open="open"
    >
      <view class="u-popup-slot">
        <u-list>
          <u-list-item v-for="(item, index) in list" :key="index">
            <u-cell :title="`${item.label}：${item.value || '-'}`"></u-cell>
          </u-list-item>
        </u-list>
      </view>
    </u-popup>
  </view>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    padding: {
      type: String,
      default: '9px 12px',
    },
  },

  data() {
    //这里存放数据
    return {
      show: false,
      roll: true,
      popupData: {
        round: 10,
        overlay: true,
        mode: 'bottom',
        borderRadius: '',
        closeable: true,
        closeOnClickOverlay: true,
      },
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    list: {
      handler(news, old) {
        //   this.isRoll();
      },
      deep: true,
      immediate: true,
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    setTimeout(() => {
      this.roll = false
    }, 3000)
  },
  //   方法集合
  methods: {
    close() {
      this.show = false
    },
    open() {
      this.show = true
    },
    listToStr(list) {
      let str = ''
      list.map(ite => {
        str = str + ite.label + '：' + (ite.value || '-') + '\u00A0 \u00A0 \u00A0'
      })

      return str
    },

    isRoll() {
      // 放回数组 scrollWidth
      let wai = document.querySelector('.u-notice') //
      let nei = document.querySelector('.u-notice__content__text')
      //   一行可以显示全
      if (nei.scrollWidth <= wai.scrollWidth) {
      }
    },
  },
}
</script>
<style scoped lang="scss">
.notice-bar {
  width: 100%;
  .u-popup-slot {
    height: 50vh;
    margin: 60rpx;
  }
  ::v-deep.u-notice-bar {
    padding: var(--padding);
  }
  ::v-deep.u-notice__content__text {
    // padding-left: 30% !important;
    // padding-right: 0% !important;
  }
}
</style>
