<template>
  <view class="pageIndex px32rpx py18rpx">
    <view class="center h100px">测试demo页面</view>
    <m-search-select
      ref="searchRef"
      showHistory
      class="flex-1 mr25rpx"
      v-model="searchData.processCode"
      cacheKey="mesProcessCode"
      valueKey="processCode"
      placeholder="请扫描或输入工序编码或名称"
      :api="onlyCodeScanProcess"
      :searchParams="searchParams"
      @scan="handleSearch"
      @select="searchSelectHandler"
      @confirm="handleSearch"
    >
      <template v-slot:option="item">
        <view class="flex"
          ><view>{{ item.processName }}</view
          ><view class="text-#666"> ({{ item.processCode }})</view></view
        >
      </template>
    </m-search-select>
    <MSelect v-model="searchData.processCode"></MSelect>
  </view>
</template>
<script>
import { MSearchSelect,MSelect } from '@/packages'
export default {
  name: 'pageIndex',
  components: {
    MSearchSelect,
    MSelect
  },
  data() {
    return {
      searchData: {
        processCode: ''
      },
      searchParams: {},
      onlyCodeScanProcess: () =>
        new Promise((resolve) => {
          resolve({
            data: [
              {
                processCode: '123',
                processName: '123'
              }
            ]
          })
        })
    }
  },
  methods: {
    handleSearch() {},
    searchSelectHandler(item) {}
  }
}
</script>
<style lang="scss" scoped></style>
