<template>
  <view class="pageIndex bg-red">
    <view class="text-center">
      <text class="text-xxl">首页</text>
    </view>
    <u-input v-model="a"></u-input>
    
  </view>
</template>
<script>
export default {
  name: 'pageIndex',
  data() {
      return {
        a:''
      };
  },
  onLoad(options) {
    console.log(1111);
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
