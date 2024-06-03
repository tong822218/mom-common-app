<template>
  <u-list v-bind="$attrs" v-on="$listeners" height="100%">
    
    <view v-if="list && list.length">
      <view v-for="(item, index) in list" :key="index">
        <slot :item="item" :index="index"></slot>
      </view>
      <u-loadmore :status="loadMoreStatus" nomoreText="已到底部" class="pb30rpx" color="#B6C0C9" />
    </view>
    <u-empty v-else mode="search" class="h-560rpx"></u-empty>
  </u-list>
</template>

<script>
import mButton from '../MButton'
export default {
  name: 'MList',
  components: { mButton },
  props: {
    loadMoreStatus: {
      type: String,
      default: 'loadmore'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
