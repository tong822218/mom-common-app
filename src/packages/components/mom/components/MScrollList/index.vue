<template>
  <view class="m-scroll-list flex flex-col">
    <view class="list-container flex-1 h0 mt8rpx">
      <m-list @scrolltolower="scrolltolower" :list="list" :loadMoreStatus="loadMoreStatus">
        <template slot-scope="{ item, index }">
          <view class="mb8rpx" style="background-color: #fff">
            <slot :item="item" :index="index"></slot>
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
    // 搜索条件
    searchParams: {
      type: Object | String,
      default: ''
    },
    // 接口请求完成后回调
    requestAfter: {
      type: Function | null,
      default: null
    },
    // 是否自动加载数据
    autoLoad: {
      type: Boolean,
      default: true
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

  mounted() {
    if (this.autoLoad) {
      this.loadmore(true)
    }
  },
  methods: {
    getList(){
      return this.list
    },
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
    getPageParams(reset) {
      if (reset) {
        this.searchPage.pageNum = 1
      }
      return this.searchPage
    },
    // 获取数据
    loadmore(reset) {
      this.loadMoreStatus = 'loading'
      const params = {
        ...this.getPageParams(reset),
        ...this.searchParams
      }
      this.api(params)
        .then(async (res) => {
          const { total, records } = this.requestAfter ? await this.requestAfter(res.data.result) : res.data.result
          this.total = total
          if (reset) {
            this.list = []
            await this.$nextTick()
            this.list = records
          } else {
            this.list = [...this.list, ...records]
          }

          if (this.list.length >= this.total) {
            this.loadMoreStatus = 'nomore'
          } else {
            this.loadMoreStatus = 'loadmore'
          }
        })
        .catch((err) => {
          this.list = []
          this.loadMoreStatus = 'nomore'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-scroll-list {
  width: 100%;
  height: 100%;
}
</style>
