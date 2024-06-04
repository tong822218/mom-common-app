<template>
  <u-popup mode="bottom" :show="selfShow" @close="close" class="select-search">
   <view v-if="title" class="fw-600 text-center text-15px p-y-20rpx p-l-20rpx border-bottom ">选择批次</view>
    <view class="search">
      <u-search
        placeholder="请输入搜索内容"
        v-model="name"
        @change="handleSearch"
        @search="handleSearch"
        :clearabled="true"
      ></u-search>
    </view>
    <view class="content">
      <scroll-view scroll-y="true" style="height: 400rpx;">
        <view
          class="item"
          v-for="(item, index) in items"
          :key="index"
          @click="confirm(item)"
        >
          {{ item[labelKey] }}
          <text v-if="item[valueKey]">{{ `(${item[valueKey]})` }}</text>
        </view>
      </scroll-view>
      <view style="width: 90%; margin: 10px auto;" class="flex-j-s-b">
        <u-button size="small" type="info" shape="circle" plain @click="close">
          取消
        </u-button>
        <u-button
          size="small"
          v-if="isShowClean"
          class="m-l-10"
          type="error"
          shape="circle"
          plain
          @click="closeInput"
        >
          清除已选
        </u-button>
      </view>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isShowClean: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selfShow: false,
      name: "",
      list: [],
      items: [],
    };
  },
  methods: {
    confirm(val) {
      this.$emit("confirm", val);
      this.close();
    },
    closeInput() {
      this.$emit("closeInput");
      this.close();
    },
    close() {
      this.name = "";
      this.selfShow = false;
      this.$emit("update:show", false);
      this.$emit("input", false);
    },
    handleSearch(val) {
      if (!val) {
        this.items = this.list;
        return;
      }
      const items = this.list.filter((item) =>
        item[this.labelKey].includes(val)
      );
      console.log(555, items);
      this.items = items;
    },
  },
  watch: {
    // show(val) {
    //   this.selfShow = val;
    // },
    data: {
      handler(val) {
        this.list = val;
        this.items = val;
        // console.log(9999,this.items )
      },
      immediate: true,
    },
    value: {
      handler(val) {
        this.selfShow = val;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 30rpx 20rpx;
}
.content {
  text-align: center;
}

.select-search {
  .flex-j-s-b {
    display: flex;
    justify-content: space-between;
  }
  .m-l-10 {
    margin-left: 20rpx;
  }
}
.item {
  padding: 30rpx 0;
  border-bottom: 2rpx #f0f0f0 solid;
}
</style>
