<template>
  <view class="notice-bar" :style="{ '--padding': padding }">
    <!-- 滚动显示基本信息 -->
    <u-notice-bar v-bind="{ ...$attrs, ...$props }" :icon="null" :text="listToStr(list)" speed="50" bgColor="transparent" :rollLive="true" color="#5A6F82"></u-notice-bar>

    <!-- 是否显示切换操作人的按钮 -->
    <u-image v-if="canChangePeople" @click="changePeopleClick" src="/static/common/icon_people_switch@2x.png" width="48rpx" height="48rpx" mode="widthFix" />

    <!-- 自定义确认组件 -->
    <MConfirmModal :title="title" :show="show" @confirm="confirm" @cancel="cancel">
      <u-input placeholder="扫描或输入操作工编号" shape="circle" v-model="opraterCodeInput" :customStyle="{ background: '#ffffff' }" >
        <u-icon name="scan" @click="handleScan" color="#CDCDCD" size="24" slot="suffix"></u-icon>
      </u-input>
    </MConfirmModal>
  </view>
</template>

<script>
import MConfirmModal from '@/components/MConfirmModal/index.vue'
import { getUserExtendByUserCode } from '@/api/common'
export default {
  components: { MConfirmModal },
  props: {
    canChangePeople: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    },
    padding: {
      type: String,
      default: '9px 0px'
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      opraterCodeInput: '',
      title: '切换操作工'
    }
  },
  computed: {
    operatorCode() {
      return this.$store.getters.operatorCode
    }
  },

  created() {
    this.setOpraterInfo(this.operatorCode, false)
  },
  methods: {
    async confirm() {
      await this.setOpraterInfo(this.opraterCodeInput, true)
      this.show = false
    },
    async setOpraterInfo(userCode, showSuccessMsg) {
      try {
        const res = await getUserExtendByUserCode({ userCode, ...this.params })
        this.$store.commit('SET_OPERATORINFO', res.data.result)
        this.$emit('opraterConfirm')
        showSuccessMsg && this.$showMessage('切换成功！')
      } catch (error) {
        return
      }
    },
    cancel() {
      this.show = false
    },
    changePeopleClick() {
      this.show = true
    },
    listToStr(list) {
      let str = ''
      list.map((ite) => {
        str = str + ite.label + '：' + (ite.value || '-') + '\u00A0 \u00A0 \u00A0'
      })
      return str
    },
    handleScan() {
      this.$mpaasScan({
        success: ({ result }) => {
          this.$emit('input', result)
          this.$emit('scan', result)
          this.opraterCodeInput = result
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.notice-bar {
  display: flex;
  width: 100%;
  align-items: center;
  .u-popup-slot {
    height: 50vh;
    margin: 60rpx;
  }
  ::v-deep.u-notice-bar {
    padding: var(--padding);
  }
}
</style>
