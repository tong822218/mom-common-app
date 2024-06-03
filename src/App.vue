<script>
export default {
  onLaunch() {
   
  },
  onShow() {},
  methods: {},
};
</script>

<style lang="scss">
@import "@/packages/components/uview-ui/index.scss";
* {
  box-sizing: border-box;
}
.overflow-ellipsis {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 添加省略号 */
}
page {
  height: 100%;
  background-color: #f3f5fb;
}
::v-deep uni-modal {
  z-index: 40000;
}
.uno-start {
  --un: 0;
}
/* unocss 代码生成在这 */
.uno-end {
  --un: 0;
}
</style>
