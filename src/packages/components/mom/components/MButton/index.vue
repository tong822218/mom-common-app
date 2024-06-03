<template>
  <u-button v-bind="$attrs" v-on="$listeners" :type="$attrs.type || 'primary'" :shape="$attrs.shape || 'circle'" :customStyle="customStyleIn">
    <slot></slot>
  </u-button>
</template>

<script>
export default {
  name: 'MListItem',
  props: {
    customStyle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    customStyleIn() {
      return {
        ...{ height: '48rpx', width: 'auto', margin: 0 },
        ...this.customStyle
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.m-button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #f3f3f5;
}
</style>
