<template>
  <view class="m-search-pop">
    <u-popup :show="show" v-bind="$attrs" v-on="$listeners" @close="close" :closeable="true">
      <view class="flex flex-col h-80vh">
        <text class="pop-title text-5A6F82 text-28rpx center h100rpx">{{ title }}</text>
        <view class="flex px33rpx">
          <m-search
            class="mt34rpx mb17rpx"
            v-model="searchValue"
            placeHolder="输入关键字检索"
            :showScan="showScan"
            :customStyle="{ background: '#F3F3F5' }"
            @confirm="search"
            @scan="scan"
          ></m-search>
        </view>
        <view class="flex flex-1 h0 px33rpx">
          <m-list @scrolltolower="scrolltolower" :list="list" :loadMoreStatus="loadMoreStatus">
            <template slot-scope="{ item }">
              <view
                class="flex justify-between h100rpx items-center font-500 text-333 text-28rpx border-b-1px border-b-solid border-b-F3F3F5"
                @click="chose(item)"
              >
                <text :class="[current[options.uniqueKey] == item[options.uniqueKey] ? 'text-0066FF' : '']">{{ item[options.text] }}</text>
                <text
                  v-if="options['subText']"
                  class="mr-auto"
                  :class="[current[options.uniqueKey] == item[options.uniqueKey] ? 'text-0066FF' : 'text-999 ']"
                >
                  ({{ item[options.subText] }})
                </text>
                <u-image
                  mode="aspectFit"
                  width="50rpx"
                  height="50rpx"
                  v-if="current[options.uniqueKey] == item[options.uniqueKey]"
                  src="/static/common/icon_checked@2x.png"
                ></u-image>
              </view>
            </template>
          </m-list>
        </view>
        <view class="h142rpx px50rpx center" v-hide-on-keyboard-show>
          <m-button @click="close" type="info" :customStyle="{ width: '100%', height: '75rpx', margin: '0 15rpx' }">{{
            $t('momComponent.cancel')
          }}</m-button>
          <m-button @click="confirm" :customStyle="{ width: '100%', height: '75rpx', margin: '0 15rpx' }">{{ confirmText }}</m-button>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import MSearch from '../MSearch'
import MList from '../MList'
import MButton from '../MButton'
export default {
  name: 'MSearchPop',
  components: { MSearch, MList, MButton },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 查询api接口
    api: {
      type: Function,
      default: () => {}
    },
    // 弹出框顶部标题
    title: {
      type: String,
      default: () => $i18n.t('momComponent.pleaseChose')
    },
    // 显示扫描图标
    showScan: {
      type: Boolean,
      default: false
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: () => $i18n.t('mesProcessCode.confirm')
    },
    // 其它搜索条件
    otherParams: {
      type: Object,
      default: () => {}
    },
    // 搜索框键值
    searchKey: {
      type: String,
      default: 'userName'
    },
    // 回显的字段key
    options: {
      type: Object,
      default: () => {
        return {
          uniqueKey: 'userId',
          text: 'nickName',
          subText: 'jobNumber'
        }
      }
    }
  },
  data() {
    return {
      current: {},
      searchValue: '',
      loadMoreStatus: 'loadmore',
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      list: []
    }
  },
  computed: {},
  watch: {
    show: {
      handler(val) {
        if (val) {
          this.loadmore(true)
        } else {
          this.searchValue = ''
          this.current = {}
          this.list = []
        }
      }
    }
  },
  methods: {
    chose(item) {
      this.current = item
    },
    // 滚动到底部加载更多
    scrolltolower() {
      if (this.loadMoreStatus == 'loading' || this.loadMoreStatus == 'nomore') {
        return
      }

      this.searchPage.pageNum++
      this.loadmore()
    },

    // 获取分页参数
    getSecondParams() {
      return this.showSecondTabs ? this.secondTabsParams : {}
    },
    // 获取分页参数
    getPageParams(reset) {
      return reset ? this.$options.data().searchPage : this.searchPage
    },
    // 获取数据
    loadmore(reset) {
      this.loadMoreStatus = 'loading'
      const params = {
        [this.searchKey]: this.searchValue,
        ...this.otherParams,
        ...this.getPageParams(reset)
      }
      this.api(params).then((res) => {
        const { records, total } = res.data.result
        this.total = total
        this.list = reset ? [...records] : [...this.list, ...records]
        if (this.list.length >= this.total) {
          this.loadMoreStatus = 'nomore'
        } else {
          this.loadMoreStatus = 'loadmore'
        }
      })
    },
    search() {
      this.loadmore(true)
    },
    scan() {
      this.$emit('scan')
    },
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('confirm', this.current)
    }
  }
}
</script>

<style scoped lang="scss">
.m-search-pop {
  .pop-title {
    border-bottom: 1rpx solid #f3f3f5;
  }
}
</style>
