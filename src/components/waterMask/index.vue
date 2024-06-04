<template>
  <!-- v-if="config.resourceId" -->
  <view
    ref="waterMask"
    class="_waterMask"
    v-if="config.resourceId"
    :style="{ width: config.width, height: config.height }"
  >
    <view
      class="pack"
      :style="{
        opacity: config.opacity,
        width: config.width,
        height: config.height,
      }"
    >
      <view
        :key="ite"
        :style="{
          width: config.packW,
          height: config.packH,
          transform: 'rotate(' + transform + ')',
        }"
        class="item"
        v-for="ite in length"
        :class="config.align"
      >
        <image
          class="img"
          style="width: 100rpx; height: 50rpx;"
          mode="aspectFit"
          v-if="config.value[0]"
          :src="config.value[0]"
          alt=""
        />
        <view class="value">
          <text
            class="text"
            :style="{ color: config.fontColor, fontSize: config.fontSize }"
            v-if="config.value[1]"
          >
            {{ config.value[1] }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { watermarkConfig } from "@/api/menuList";
export default {
  props: {
    // 是否显示系统水印
    path: {
      type: String,
      default: "",
    },
    // 受否禁用水印
    destroy: {
      type: Boolean,
      default: true,
    },
    length: {
      type: Number,
      default: 50,
    },
    // 旋转角度
    transform: {
      type: String,
      default: "-15deg",
    },
  },
  data() {
    return {
      drawer: true,
      requests: true, //请求配置信息
      config: {
        resourceId: "",
        height: 0,
        width: 0,
        packW: 0,
        packH: 0,
        fontColor: "#fff",
        fontSize: "14px",
        value: ["", ""],
        align: "left",
        opacity: 0.5,
      },
    };
  },
  methods: {
    //布局方式,对应转换
    getAlign(type) {
      if (type == 2) {
        return "top";
      } else if (type == 3) {
        return "left";
      } else {
        return "center";
      }
    },
    //获取水印详细信息
    async watermarkConfig(refresh = false, callback) {
      //白名单不请求
      if (refresh) {
      } else {
        // 若已经有了不再请求
        if (uni.getStorageSync("watermarkConfig")) {
          callback ? callback() : "";
          return;
        }
      }
      // 无登录,清空水印
      if (!uni.getStorageSync("token")) {
        this.hiden();
        return;
      }
      let res = await watermarkConfig();
      let {
        resourceRouteMap = {},
        watermarkList = [],
        systemWatermarkId,
      } = res.data.result;
      // 存储全部页面的水印信息
      uni.setStorageSync("watermarkConfig", {
        resourceRouteMap,
        watermarkList,
        systemWatermarkId,
      });
      callback ? callback() : "";
      // this.show("/index");
    },
    //初始化实例,设置路由监听
    watchRoute() {
      let that = this,
        naviArr = [
          "navigateTo",
          "redirectTo",
          "reLaunch",
          "switchTab",
          "navigateBack",
        ];
      for (let i of naviArr) {
        uni.addInterceptor(i, {
          //监听跳转
          success(res) {
            that.getRoute();
          },
          // invoke(res) {
          //   if (res.url == "/pages/login/index") {
          //     //强制不请求,
          //     that.requests = false;
          //   } else {
          //     that.requests = true;
          //   }
          //   return true;
          // },
          // complete(res) {
          //   console.log("监听路由-complete", res);
          // },
        });
      }
      // that.getRoute('/index');
    },
    //设置水印   path路由信息    all 是否查找并且渲染系统级别水印
    setwatermarkConfig(path) {
      if (!path) return;
      const _this = this;
      let {
        resourceRouteMap,
        watermarkList,
        systemWatermarkId,
      } = uni.getStorageSync("watermarkConfig");
      // console.log(444444444, resourceRouteMap);
      // 系统级别查找
      // if (all) {
      // 	setWatermark(systemWatermarkId, "sysData");
      // }
      try {
        let uuid =
          path == "/index" ? systemWatermarkId : resourceRouteMap[path];
        // && uuid != systemWatermarkId
        if (uuid) {
          this.setWatermark(uuid, watermarkList);
        } else {
          if (systemWatermarkId) {
            // 设置成系统的
            this.setWatermark(systemWatermarkId, watermarkList);
          } else {
            _this.hiden();
          }
        }
      } catch (error) {
        _this.hiden();
      }
    },
    setWatermark(id, watermarkList) {
      const _this = this;
      let data = watermarkList.find((ite) => ite.id == id);
      // 配置系统级别水印
      if (data) {
        let {
          alpha,
          resourceId,
          watermarkType,
          fontSize,
          color,
          watermarkImage,
          wordContent,
        } = data;

        uni.getSystemInfo({
          success: (res) => {
            _this.config = {
              resourceId,
              opacity: (alpha || 10) / 100,
              align: _this.getAlign(watermarkType),
              fontSize: `${fontSize}px`,
              fontColor: color,
              width: res.windowWidth * 1.5 + "px",
              height: res.windowHeight * 1.5 + "px",
              packW: (res.windowWidth * 1.2) / 2.5 + "px",
              packH: (res.windowHeight * 1.2) / 3.5 + "px",
              value: [watermarkImage || "", wordContent || ""],
            };
          },
        });
      }
    },
    // 显示水印
    show(path) {
      this.setwatermarkConfig(path);
    },
    hiden() {
      this.config = {
        resourceId: "",
      };
    },
    //路由监听
    getRoute(bool = false) {
      setTimeout(() => {
        let url = this.getLocation();
        url
          ? this.watermarkConfig(bool, () => {
              this.show(url);
            })
          : this.hiden();
      }, 10);
    },
    // 获取url
    getLocation() {
      let url = decodeURIComponent(location.pathname);
      // 拦截登录页
      if (url.split("/").length < 4 || url.includes("/pages/login/index")) {
        return "";
      } else {
        return url;
      }
    },
  },
  async mounted() {
    // 获取水印设置的信息
    // 加载监听部分
    // #ifdef H5
    this.watchRoute();
    if (this.getLocation()) {
      this.getRoute(true);
    } else {
      this.hiden();
    }
    // #endif
  },
};
</script>
<style lang="scss" scoped>
._waterMask {
  top: 0px;
  position: fixed;
  z-index: 999999;
  width: 1000px;
  height: 1000px;
  overflow: hidden;
  /*#ifndef APP-NVUE*/
  pointer-events: none;
  /*#endif*/
  .text {
    // width: 50px;
    // height: 50px;
    text-align: center;
  }
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .left {
    display: flex;
    align-items: center;
    // justify-content: space-evenly;
    flex-wrap: nowrap;
    flex-direction: row;

    .img {
      // flex: 1;
    }

    .value {
      // flex: 1;
    }
  }
  .pack {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 1000px;
    height: 1000px;
    z-index: 999999;
    // transform-origin: top;
    color: #fff;
    // pointer-events: none;
    -webkit-transform: rotate(-10deg);
    transform: rotate(-10deg);
    display: flex;
    flex-wrap: wrap;

    .item {
      // pointer-events: none;
      // background: black;
      // -webkit-transform: rotate(var(--transform));
      // transform: rotate(var(--transform));
      // font-size: var(--fontSize);
      font-weight: 100;
      // width: var(--sizeW);
      // height: var(--sizeH);
      // float: left;
      // color: var(--fontColor);
    }
  }
}
</style>
