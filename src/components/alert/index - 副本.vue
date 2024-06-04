<template>
  <view>
    <u-alert
      v-if="description"
      :closable="true"
      :type="type"
      :description="description"
    ></u-alert>

    <u-alert
      :key="timeKey"
      v-if="show"
      :closable="true"
      :type="types"
      :description="descriptions"
    ></u-alert>
  </view>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "success",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: false,
      types: "success",
      descriptions: "",
      timeKey: 1,
    };
  },
  methods: {
    setTimeKeys() {
      this.timeKey = new Date().getTime();
    },
    success(msg) {
      this.setTimeKeys();
      this.show = true;
      this.types = "success";
      this.descriptions = msg;
    },
    warning(msg) {
      this.setTimeKeys();
      this.show = true;
      this.types = "warning";
      this.descriptions = msg;
    },
    error(msg) {
      this.show = true;
      this.setTimeKeys();
      this.types = "error";
      this.descriptions = msg;
    },
    info(msg) {
      this.show = true;
      this.setTimeKeys();
      this.types = "info";
      this.descriptions = msg;
    },
    close(time) {
      this.time = "";
    },
  },
  watch: {},
};
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
