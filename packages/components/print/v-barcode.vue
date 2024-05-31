<template>
  <div class="v-barcode" v-if="element">
    <vue-barcode ref="printBarCode" v-bind="options"></vue-barcode>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  name: 'VBarcode',
  components: { VueBarcode },
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
      barSvg: ''
    }
  },
  computed: {
    imgStyle() {
      const { width, height } = this.element.style
      return {
        backgroundImage: `url(${this.barSvg})`,
        width: width + 'px',
        height: height + 'px'
      }
    },
    options() {
      let options = {}
      Object.keys(this.element.props).forEach((key) => {
        const item = this.element.props[key]
        options[key] = item.value
        options['value'] = this.propValue
      })
      return options
    }
  },
  watch: {
    element: {
      handler(val) {
        if (val) {
          setTimeout(() => {
            const vnode = this.$refs.printBarCode.$el
            const svg = vnode.querySelector('.vue-barcode-element')
            if (svg) {
              svg.setAttribute('width', val.style.width)
              svg.setAttribute('height', val.style.height)
            }
          }, 0)
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.v-barcode {
  width: 100%;
  height: 100%;
  .svg-img {
    display: flex;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
