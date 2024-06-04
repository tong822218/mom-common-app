<!--统一包装, 带统一请求接口的签名  -->
<template>
  <view class="sinSignature">
    <view>
      <sinSignature ref="sin" v-model="sin" v-bind="$attrs" v-on="$listeners" :disabled="disabled" @getImage="setImagePath">
        <template v-slot:default="{ img }">
          <slot :img="img">
            <image v-if="img" :src="img" mode="scaleToFill"></image>
            <view v-else>
              <view>
                <image class="icon" src="@/images/qianzi.png" mode="scaleToFill"></image>
              </view>
              <view class="title">点 击 签 字</view>
            </view>
          </slot>
        </template>
      </sinSignature>

      <u-modal class="sfsdfasdf" content="确认提交该签字吗?" :show="modalShow" showCancelButton closeOnClickOverlay @confirm="confirm" @cancel="cancel" @close="close"></u-modal>
    </view>
  </view>
</template>
<script>
//例如：import 《组件名称》 from '《组件路径》';
import sinSignature from '@/components/sinSignature/sinSignature.vue'
import { setUserAutograph, getUserAutograph } from '@/api/login.js'
export default {
  name: '',
  //import引入的组件需要注入到对象中才能使用
  components: { sinSignature },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
    initForm: {
      type: Object,
      default: () => {
        return {}
      },
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    //这里存放数据
    return { sin: '', modalShow: false }
  },
  watch: {
    sin: {
      handler(news, old) {
        //  console.log(news, old);
        this.$emit('value', news || '')
      },
      immediate: true,
    },
  },

  //方法集合
  methods: {
    // 显示签名面板
    showBtm() {
      this.$refs.sin.showSignature()
    },
    // 组件初始化,回显签名
    async getUserAutograph(base64) {
      let res = await getUserAutograph({ base64 })
      this.sin = res.data.result
    },
    //设置签名提交服务器数据
    async setImagePath(base64) {
      this.modalShow = true
      // await setUserAutograph({ base64, ...this.initForm });
    },
    async confirm() {
      try {
        let res = await setUserAutograph({ img: this.sin, ...this.initForm })
        this.modalShow = false
        this.$emit('onSuccess', res)
        this.$refs.sin.hideSignature()
      } catch (error) {
        this.$emit('onError', error)
      }
    },
    cancel() {
      this.modalShow = false
    },
    close() {
      this.modalShow = false
    },
  },
  mounted() {
    // 初始化,加载签名
    // this.getUserAutograph();
  },
}
</script>
<style scoped lang="scss">
.sinSignature {
  ::v-deep.u-popup__content {
    transform: rotate(90deg);
  }
}
</style>
