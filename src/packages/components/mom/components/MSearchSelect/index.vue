<template>
  <view class="search-container" :key="$attrs.ref">
    <view class="search-input">
      <u-input
        :placeholder="$attrs.placeholder || $i18n.t('common.scanOrEnterOrderFirst')"
        shape="circle"
        clearable
        :customStyle="{ background: '#ffffff' }"
        :focus="focus"
        :value="value"
        @focus="inputFocus"
        @blur="inputBlur"
        v-on="$listeners"
        v-bind="$attrs"
        :selection-start="0"
        :selection-end="selectEndIndex"
        @confirm="confirm"
      >
        <u-icon name="search" color="#CDCDCD" size="24" slot="prefix"></u-icon>
        <u-icon name="scan" v-if="showScan" @click="handleScan" color="#CDCDCD" size="24" slot="suffix"></u-icon>
      </u-input>
    </view>
    <view class="searchList-pack" v-if="isShowSearch" :style="searchListDomStyle">
      <view class="card" @click.stop="">
        <!-- 最近搜索历史 -->
        <view v-if="historyList.length && showHistory && api">
          <view class="header">
            <view class="title">搜索历史</view>
          </view>
          <view class="history">
            <view class="history-item" :key="index" v-for="(ite, index) in historyList" @click.native.stop="handerHistory(ite)">
              {{ formatterHistory(ite) }}
            </view>
            <view @click.native.stop="deleteHistory">
              <u-icon name="close-circle-fill" color="#B6C0C9"></u-icon>
            </view>
          </view>
        </view>

        <view class="header" v-if="api">
          <view class="title">{{ $i18n.t('common.matchingResults') }}</view>
        </view>
        <view class="list">
          <u-list v-if="isShowSearch && selectOptions && selectOptions.length">
            <u-list-item v-for="(item, index) in selectOptions" :key="index">
              <u-cell>
                <view class="list-item" slot="title" @click.native.stop="handerClick(item)">
                  <slot name="option" v-bind="item">
                    <view class="between-center w-full">
                      <view class="flex items-center">
                        <u-icon class="icon" v-if="api" name="search"></u-icon>
                        <view class="">
                          <text
                            class="text"
                            :key="ite + i"
                            :class="[(value || '').split('').includes(ite) ? 'color1' : 'color2']"
                            v-for="(ite, i) in (item[valueKey] || '').split('')"
                          >
                            {{ ite }}
                          </text>
                        </view>
                      </view>
                      <view v-if="item.searchOrderTypeName" class="ml-auto bg-#EEF7FF p4rpx rounded-4rpx text-#5A6F82 text-24rpx">{{
                        item.searchOrderTypeName
                      }}</view>
                    </view>
                  </slot>
                </view>
              </u-cell>
            </u-list-item>
          </u-list>
          <view v-else class="empty center">{{ $i18n.t('common.noMatchingResults') }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { debounce } from '../../../../utils/tool.js'
export default {
  name: 'searchList',
  components: {},
  props: {
    /**
     * 数据查询接口
     */
    api: {
      type: Function,
      default: undefined
    },
    /**
     * 数据查询接口返回处理函数
     */
    apiResponse: {
      type: Function,
      default: undefined
    },
    // 发起请求前的钩子函数，return false 表示不发起请求
    beforeRequest: {
      type: Function,
      default: undefined
    },
    /**
     * 本地检索模式，搜索列表
     */
    options: {
      type: Array,
      default: () => undefined
    },
    /**
     * 搜索参数
     */
    searchParams: {
      type: Object,
      default: () => {}
    },
    /**
     * 绑定的值，单独拿出来是因为要监听
     */
    value: {
      type: String,
      default: ''
    },
    /**
     * 搜索历史本地缓存的key
     */
    cacheKey: {
      type: String,
      default: 'somePage'
    },
    /**
     * 搜索结果展示的字段
     */

    valueKey: {
      type: String,
      default: 'somePage'
    },
    /**
     * 显示搜索历史，只有远程搜索支持搜索历史
     */
    showHistory: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示扫码按钮
     */
    showScan: {
      type: Boolean,
      default: true
    },
    // 本地过滤方法
    filterMethod: {
      type: Function,
      default: null
    },
    // 回车后是否隐藏下拉框
    confirmHideDrop: {
      type: Boolean,
      default: true
    }
  },
  data() {
    //这里存放数据
    return {
      setTime: null,
      selectOptions: [],
      isShowSearch: false,
      key: 0,
      focus: false,
      historyList: [],
      searchListDomTop: 0,
      searchListDomBottom: 0,
      searchListDomHeight: 0,
      inputRect: {},
      selectEndIndex: 0,
      noShowSearch: false // 临时变量，用来临时标志一下，此次聚焦是由于全选文字造成，不应该显示搜索下拉框
    }
  },
  computed: {
    // 是否是远程搜索
    remoteSearch() {
      return !!this.api
    },
    // 是否本地搜索
    localSearch() {
      return !!(!this.api && this.options)
    },
    // 不支持搜索
    noSearch() {
      return !this.api && !this.options
    },
    searchListDomStyle() {
      if (!this.inputRect.bottom) return {}

      const wHeight = uni.getSystemInfoSync().windowHeight
      const { top, bottom } = this.inputRect

      return {
        position: 'absolute',
        top: (this.optionsPosition === 'bottom' ? bottom : 0) + 'px',
        height: (this.optionsPosition === 'bottom' ? wHeight - bottom : top - 8) + 'px',
        display: 'flex',
        'flex-direction': this.optionsPosition === 'bottom' ? 'column' : 'column-reverse'
      }
    },
    optionsPosition() {
      if (!this.inputRect.top) return 'bottom'

      const wHeight = uni.getSystemInfoSync().windowHeight
      return (wHeight - this.inputRect.top) / wHeight > 0.6 ? 'bottom' : 'top'
    }
  },
  //监控data中的数据变化
  watch: {
    value: {
      handler: debounce(function (val) {
        this.getSelectOptions(val)
      }, 500),
      immediate: false
    }
  },
  created() {
    this.historyList = this.getHistory()
    !this.api && this.getSelectOptions(this.value)
  },
  mounted() {
    document.addEventListener('click', this.addDocumentClickEvent)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.addDocumentClickEvent)
  },
  methods: {
    // 显示下拉框
    showDrop() {
      this.isShowSearch = true
    },

    // 隐藏下拉框
    hideDrop() {
      this.isShowSearch = false
    },

    // 增加document点击事件监听
    addDocumentClickEvent(event) {
      this.hideDrop()
    },

    // 格式化历史
    formatterHistory(str) {
      if (!str || str.length < 16) return str
      return str.substring(0, 8) + '...' + str.substring(str.length - 6)
    },

    // 文本框聚焦事件
    inputFocus() {
      this.focus = true
      if (this.noSearch || this.noShowSearch) return
      setTimeout(() => {
        this.showDrop()
        this.getSearchListRect()
      }, 100)
    },

    // 文本框失去焦点事件
    inputBlur() {
      this.focus = false
    },

    // 更新历史记录
    updateHistory(val) {
      // 列表中已经存在就不需要记录
      if (this.historyList.find((x) => x === val || x === this.value)) return
      //最前方插入
      this.historyList.unshift(val || this.value)

      //  只取前二
      this.historyList = this.historyList.slice(0, 2)
      // 存入本地缓存
      this.setHistory(this.historyList)
    },

    // 获取输入框的位置信息
    async getSearchListRect() {
      await this.$nextTick()
      let query = uni.createSelectorQuery().in(this)
      query
        .select('.search-input')
        .boundingClientRect((data) => {
          this.inputRect = data
        })
        .exec()
    },

    // 获取匹配数据
    async getSelectOptions(val) {
      this.selectOptions = []
      if (this.api) {
        val && (this.selectOptions = await this.getRemoteSearchOptions(val))
      } else {
        this.selectOptions = await this.getLocalSearchOptions(val)
      }
    },

    // 远程搜索匹配数据
    async getRemoteSearchOptions(val) {
      // 如果有请求前的钩子函数，则先执行
      if (this.beforeRequest && typeof this.beforeRequest === 'function') {
        if (!this.beforeRequest()) return this.selectOptions
      }
      let res = await this.api({ ...this.searchParams, [this.valueKey]: val })
      let list = this.apiResponse ? this.apiResponse(res) : res.data.result
      return list
    },

    // 返回本地检索结果
    getLocalSearchOptions(val) {
      if (!this.options || !this.options.length) return []
      if (this.filterMethod) {
        return this.filterMethod(val, this.options)
      }
      return this.options.filter((x) => x[this.valueKey].includes(val))
    },

    // input输入框回车事件
    confirm() {
      if (this.confirmHideDrop) {
        this.hideDrop()
      }
    },
    selectAllText() {
      this.noShowSearch = true
      this.inputFocus(false)
      setTimeout(() => {
        this.selectEndIndex = this.value.length
        this.noShowSearch = false
      }, 100)
    },

    // 点击历史记录回调
    handerHistory(data) {
      const obj = { [this.valueKey]: data }
      this.hideDrop()
      this.$emit('select', obj)
    },

    // 检索结果每一条点击事件
    handerClick(data) {
      this.hideDrop()
      this.$emit('select', data)
    },

    // 删除搜索历史
    deleteHistory() {
      let data = uni.getStorageSync('historyList') || {}
      uni.setStorageSync('historyList', { ...data, [this.cacheKey]: [] })
      this.historyList = []
    },

    // 获取搜索历史
    getHistory() {
      let data = uni.getStorageSync('historyList') || {}
      return data[this.cacheKey] || []
    },

    // 设置搜索历史
    setHistory(list) {
      // 统一插入  historyList ,下级键为当前页面, 方便其他页面扩展,可加入historyList中
      let data = uni.getStorageSync('historyList') || {}
      data[this.cacheKey] = list
      uni.setStorageSync('historyList', data)
    },

    // 扫码回调
    handleScan() {
      this.$mpaasScan({
        success: ({ result }) => {
          this.$emit('input', result)
          if (this.confirmHideDrop) {
            this.hideDrop()
          }
          // if (this.$listeners.scan && typeof this.$listeners.scan === 'function') {
          //   this.$emit('scan', result)
          // }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  .search-input {
  }
  .history {
    padding: 0 px 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    .history-item {
      padding: 10rpx 17rpx;
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      background: #fff;
      width: 40vw;
      font-size: 29rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    .history-item:active {
      background: rgb(211, 210, 210);
    }
  }
  .searchList-pack {
    background-color: #f3f5fb;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .card {
      width: 100%;
      box-sizing: border-box;
      background: #ffffff;
      padding: 24rpx;
      border-radius: 28rpx;

      .header {
        width: 100%;
        height: 40rpx;

        .title {
          width: 108rpx;
          height: 33rpx;
          background: #dbf4ff;
          border-radius: 4rpx 4rpx 4rpx 4rpx;
          font-size: 25rpx;
          font-weight: 400;
          color: #1d8cc0;
        }
      }

      .list {
        ::v-deep.u-list {
          height: auto !important;
        }
        .empty {
          font-weight: 400;
          color: #b6c0c9;
          font-size: 25rpx;
          padding: 40rpx 0;
        }
      }
    }
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .icon {
        margin-right: 10px;
      }
      .text {
        font-size: 28rpx;
        font-weight: 400;
      }

      .type {
        font-size: 24rpx;
        font-weight: 400;
        color: #5a6f82;
        background: #eef7ff;
        border-radius: 4rpx 4rpx 4rpx 4rpx;
        padding: 8rpx 10rpx;
      }
    }
    .flex-a-c {
      display: flex;
      align-items: center;
    }
    .m-t-10 {
      margin-top: 10px;
    }
    .color1 {
      color: #0066ff;
    }
    .color2 {
      color: #333333;
    }
  }
}
</style>
