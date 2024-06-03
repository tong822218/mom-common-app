<template>
  <view class="m-tabs flex flex-col">
    <view class="tabs-container flex flex-col w-full">
      <u-tabs
        :itemStyle="{ height: '83rpx' }"
        class="w-full"
        v-bind="$attrs"
        v-on="$listeners"
        lineColor="#0066FF"
        :list="tabsOptions.list"
        @change="tabChange"
        :current="tabsIndex"
        :activeStyle="{
          color: '#333',
          fontWeight: 500
        }"
        :inactiveStyle="{
          color: '#999',
          fontWeight: 400
        }"
      ></u-tabs>
      <view class="second-tabs-container flex" v-if="showSecondTabs">
        <slot name="second-tabs">
          <view
            class="second-tabs-item flex flex-1 center"
            :class="{ active: index === secondTabsIndex }"
            v-for="(item, index) in secondTabsOptions.list"
            :Key="index"
            @click="secondTabsChange(item, index)"
          >
            {{ item.name }}
          </view>
        </slot>
      </view>
    </view>
    <view class="list-container flex-1 h0 mt8rpx">
      <m-list @scrolltolower="scrolltolower" :list="list" :loadMoreStatus="loadMoreStatus">
        <template slot-scope="{ item, index }">
          <view class="mb8rpx">
            <slot :item="item" :index="index"></slot>
            <view class="h100rpx pr33rpx end-center" v-if="tabsOptions.list[tabsIndex].operate">
              <m-button
                @click="btn.fun(item)"
                :type="btn.type"
                :customStyle="{ marginLeft: '20rpx' }"
                v-for="btn in tabsOptions.list[tabsIndex].operate || []"
              >
                {{ btn.label }}
              </m-button>
            </view>
          </view>
        </template>
      </m-list>
    </view>
  </view>
</template>

<script>
import mList from '../MList/'
import mButton from '../MButton'
export default {
  name: 'MTabs',
  components: { mButton, mList },
  props: {
    api: {
      type: Function,
      default: () => {}
    },
    searchParams: {
      type: Object | String,
      default: ''
    },
    tabsOptions: {
      type: Object,
      default: () => {
        return { props: '', tabs: [] }
      }
    }
  },
  data() {
    return {
      tabsIndex: 0,
      secondTabsIndex: 0,
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      list: [],
      loadMoreStatus: 'loadmore'
    }
  },
  computed: {
    // 二级tabs
    secondTabsOptions() {
      return (this.tabsOptions.list && this.tabsOptions.list[this.tabsIndex].children) || []
    },
    showSecondTabs() {
      return this.secondTabsOptions && this.secondTabsOptions.list?.length > 0
    },
    tabsParams() {
      if (!this.tabsOptions.props) return {}
      return { [this.tabsOptions.props]: this.tabsOptions.list[this.tabsIndex]?.value }
    },

    secondTabsParams() {
      if (!this.secondTabsOptions || !this.secondTabsOptions.props) return {}
      console.log(this.secondTabsOptions.list[this.secondTabsIndex])
      return { [this.secondTabsOptions.props]: this.secondTabsOptions.list[this.secondTabsIndex]?.value }
    }
  },
  mounted() {
    this.loadmore(true)
  },
  methods: {
    refresh(reset) {
      this.loadmore(reset)
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
        ...this.searchParams,
        ...this.tabsParams,
        ...this.secondTabsParams,
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
    tabChange(item) {
      this.tabsIndex = item.index
      this.loadmore(true)
      this.$emit('change', item)
    },
    // 二级tab切换
    secondTabsChange(item, index) {
      this.secondTabsIndex = index
      this.loadmore(true)
      this.$emit('secondTabsChange', item, index)
    }
  }
}
</script>

<style lang="scss" scoped>
.m-tabs {
  width: 100%;
  .tabs-container {
    background-color: #fff;
    border-radius: 17rpx 17rpx 0 0;
  }
  .second-tabs-container {
    height: 75rpx;
    justify-content: center;
    align-items: center;
    border-top: solid 1px #f3f3f5;
    color: #999999;
    font-size: 28rpx;
    .second-tabs-item {
      height: 100%;
      &:not(:last-child) {
        border-right: solid 1px #f3f3f5;
      }
    }
    .active {
      color: #0066ff;
    }
  }
}
</style>
