<template>
  <m-pop-top :show="show" @close="close" :showButtons="false" :title="title">
    <view class="px33rpx pt33rpx">
      <m-search
        v-model="searchValue"
        @confirm="search"
        :customStyle="{ background: '#F3F3F5', height: '68rpx' }"
        plcaeholder=""
        showScan
        @scan="scan"
      ></m-search>
    </view>
    <view v-if="filterOptions.length" class="flex flex-col overflow-y-auto max-h-35vh w-full mt18rpx pb18rpx px33rpx">
      <view
        v-for="(item, index) in filterOptions"
        :key="index"
        class="shrink-0 start-center h100rpx text-30rpx text-#333 border-bottom"
        @click="choose(item)"
      >
        <template v-if="showLabel">
          <view :style="{ color: item[valueKey] === curValue ? '#0066FF' : '#333' }">{{ item[labelKey] }}</view>
          <view class="text-#999" :style="{ color: item[valueKey] === curValue ? '#0066FF' : '#999' }">({{ item[valueKey] }})</view>
        </template>
        <template v-else>
          <view :style="{ color: item[valueKey] === curValue ? '#0066FF' : '#333' }">{{ item[valueKey] }}</view>
        </template>
        <u-image
          src="../../images/icon_checked@2x.png"
          width="50rpx"
          height="50rpx"
          v-if="item[valueKey] === curValue"
          class="ml-auto"
          mode="widthFix"
        ></u-image>
      </view>
    </view>
    <u-empty v-else mode="data" class="w-full" :icon="require('@/static/list1.png')" />
  </m-pop-top>
</template>

<script>
import MSearch from '../MSearch'
import MPopTop from '../MPopTop'
import { debounce } from '@/utils/judge.js'
export default {
  name: 'MSelect',
  components: { MPopTop, MSearch },
  props: {
    title: {
      type: String,
      default: '请选择'
    },
    show: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: String | Number,
      default: ''
    },
    showLabel: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.curValue = this.value
        this.filter('')
      }
    },
    searchValue: {
      handler: debounce(function (val) {
        this.filter(val)
      }, 500),
      immediate: true
    }
  },

  data() {
    return {
      searchValue: '',
      curValue: '',
      filterOptions: []
    }
  },
  methods: {
    search() {
      console.log(123)
    },
    filter(val) {
      this.filterOptions = this.options.filter((x) => (x[this.valueKey] + '').includes(val) || x[this.labelKey].includes(val))
    },
    close() {
      this.$emit('close')
    },
    choose(data) {
      this.curValue = data[this.valueKey]
      this.$emit('change', data)
    },
    scan() {
      this.$mpaasScan({
        success: ({ result }) => {
          this.searchValue = result
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
