<template>
  <qrcode-vue ref="printQrcode" :value="propValue || '编码为空'" :size="width" render-as="svg" :level="level" />
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
  components: { QrcodeVue },
  props: {
    propValue: {
      type: String,
      default: ''
    },
    element: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      width: 100,
      level: 'L'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-img {
  display: flex;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
