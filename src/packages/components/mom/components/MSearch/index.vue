<template>
  <view class="m-search">
    <u-input
      v-bind="$attrs"
      v-on="$listeners"
      :placeholder="$attrs.placeholder"
      :clearable="true"
      :shape="$attrs.shape || 'circle'"
      :customStyle="customStyleIn"
      ref="mInput"
      :focus="focus"
      @focus="onFocus"
      @blur="onBlur"
      :selection-start="0"
      :selection-end="selectEndIndex"
      :placeholderClass="$attrs.placeholderClass || 'placeholderClass'"
    >
      <u-icon size="24" slot="prefix" color="#B6C0C9" :name="$attrs.prefixIcon || 'search'"></u-icon>
      <u-icon size="24" v-if="showScan" slot="suffix" color="#B6C0C9" :name="$attrs.prefixIcon || 'scan'" @click="$emit('scan')"></u-icon>
    </u-input>
  </view>
</template>

<script>
export default {
  name: 'MSearch',
  props: {
    showScan: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectEndIndex: 0,
      focus: false
    }
  },
  mounted() {},
  computed: {
    customStyleIn() {
      return {
        ...{ background: 'rgba(255,255,255,0.8)' },
        ...this.customStyle
      }
    }
  },
  methods: {
    onFocus() {
      this.focus = true
      this.$emit('focus')
    },
    onBlur() {
      this.focus = false
      this.$emit('blur')
    },
    selectAllText() {
      this.onFocus()
      setTimeout(() => {
        this.selectEndIndex = this.$attrs.value.length
      }, 100)
    }
  }
}
</script>

<style scoped lang="scss">
.m-search * {
  box-sizing: border-box;
}
.m-search {
  width: 100%;
  height: 100%;
}
.placeholderClass {
  font-size: 14px;
  font-weight: 400;
  color: #b8b8b8;
}
</style>
