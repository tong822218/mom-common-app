<template>
  <view v-if="false">
    <u-alert :key="timeKey" v-if="description" :closable="true" :type="type" :description="description"></u-alert>

    <u-alert
      :key="timeKey"
      v-if="show"
      :closable="true"
      :type="types"
      :description="descriptions"
      :title="title"
      @close="close"
    ></u-alert>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success"
    },
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      types: "success",
      descriptions: "",
      title: "",
      timeKey: 1
    }
  },
  methods: {
    /**
     * @author bing
     * @since 2022-12-30 14:24:57
     *   动态key
     */
    setTimeKeys() {
      this.timeKey = new Date().getTime()
    },
    success(msg, tit) {
      this.setTimeKeys()
      this.show = true
      this.types = "success"
      this.descriptions = msg
      this.title = tit
      this.close(3000)
    },
    warning(msg, tit) {
      this.setTimeKeys()
      this.show = true
      this.types = "warning"
      this.descriptions = msg
      this.title = tit
    },
    error(msg, tit) {
      this.setTimeKeys()
      this.show = true
      this.types = "error"
      this.descriptions = msg
      this.title = tit
    },
    info(msg, tit) {
      this.setTimeKeys()
      this.show = true
      this.types = "info"
      this.descriptions = msg
      this.title = tit
    },
    close(time) {
      setTimeout(() => {
        this.show = false
      }, time)
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.search {
  padding: 30rpx 20rpx;
}
.content {
  text-align: center;
}
.item {
  padding: 30rpx 0;
  border-bottom: 2rpx #f0f0f0 solid;
}
</style>
