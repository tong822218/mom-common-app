<template>
  <view class="calm-printer">
    <view class="calm-printer-btn">
      <slot name="device">
        <u-button class="mr20rpx" type="primary" plain shape="circle" @click="searchDevice" v-if="showChangeDevice">更换设备</u-button>
      </slot>
      <slot name="print" :isPrinting="isPrinting">
        <u-button type="primary" :disabled="disabled" shape="circle" v-if="showPrintBtn" @click="beforePrint">{{
          isPrinting ? printingText : text
        }}</u-button>
      </slot>
    </view>

    <view class="calm-shadow" :class="isShowSearch ? 'show' : ''" @tap="handleSearchClose">
      <view class="calm-modal" @tap.stop="nothing">
        <view class="calm-search-device">
          <view class="calm-filter-wrap">
            <view class="current-title">当前连接设备：{{ currentDevice.name }}</view>
            <!-- <input type="text" placeholder-class="calm-placeholder-class" placeholder="请输入蓝牙名字或设备ID搜索" v-model="filterName" /> -->
          </view>
          <view class="calm-btn-wrap">
            <view class="calm-btn-item confirm-btn" @click="searchDevice" v-if="!isSearching">搜索设备</view>
            <view class="calm-btn-item confirm-btn" v-else>搜索中...</view>
            <view class="calm-btn-item" @click="stopSearchDevice">停止搜索</view>
          </view>
          <view class="calm-devices-wrap">
            <view class="empty-wrap" v-if="!isSearching && filterDeviceList.length <= 0">
              <view class="empty-icon"></view>
              <view class="empty-text">~ 无可搜索到的设备 ~</view>
            </view>
            <view class="" v-else>
              <view class="calm-devices-item" v-for="(item, index) in filterDeviceList" :key="index" @click="handleConnectDevice(item)">
                <view class="name">
                  <text>设备名称：</text>
                  <text>{{ item.name ? item.name : '未命名' }}</text>
                </view>
                <view class="deviceid">
                  <text>设备ID：</text>
                  <text>{{ item.deviceId }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <canvas canvas-id="tempCanvas" id="tempCanvas" :style="{ width: canvasWidth + 'pt', height: canvasHeight + 'pt' }" class="tempCanvas"></canvas>
    <chose-template
      :show="showChangeTemplate"
      :loading="loadingTemList"
      :template-list="templateList"
      :cur-template="curTemplate"
      @confirm="changeTemplate"
      @cancel="showChangeTemplate = false"
    ></chose-template>
  </view>
</template>

<script>
const http = uni.$u.http
import { getTemplateListByProduct, getTemplateDetail } from './api.js'
import ChoseTemplate from './ChoseTemplate.vue'
export default {
  name: 'CalmPrinter',
  components: { vBarcode, vQr, ChoseTemplate },
  props: {
    showPrintBtn: {
      type: Boolean,
      default: true
    },
    //按钮默认文字
    text: {
      type: String,
      default: '打印'
    },
    //按钮打印中的文字
    printingText: {
      type: String,
      default: '打印中...'
    },
    // 要打印的基础数据
    data: {
      type: Array,
      default: () => {},
      require: true
    },
    showChangeDevice: {
      type: Boolean,
      default: true
    },
    printType: {
      type: Number,
      default: 0 // 'command' 命令打印 'image' 图片打印
    },
    printMode: {
      type: String,
      default: 'command' // 'command' 命令打印 'image' 图片打印
    },
    businessTypeCode: {
      // 打印业务类型
      type: String,
      default: '',
      require: true
    },
    goodsCode: {
      // 物料编码
      type: String,
      default: ''
    },
    orderNo: {
      // 打印业务类型
      type: String,
      default: '',
      require: false
    }
  },
  data() {
    return {
      //是否正在打印
      isPrinting: false,
      //是否正在搜索设备
      isSearching: false,
      //是否显示蓝牙列表
      isShowSearch: false,
      //按蓝牙名过滤
      filterName: '',
      // 图片画布宽
      canvasWidth: 64,
      // 图片画布高
      canvasHeight: 64,
      // 蓝牙设备列表
      devicesList: [],
      // 当前连接的打印机设备
      currentDevice: {},
      // 模板详情
      template: null,
      // 数据源信息
      dataSource: [],
      // 要发送的打印数据，会在app端解析成打印机指令
      printData: {},
      // 是否正在等待打印
      waitPrint: false,
      showChangeTemplate: false,
      templateList: [],
      curTemplate: {},
      loading: false,
      loadingTemList: true
    }
  },
  computed: {
    disabled() {
      return this.loading
    },
    baseData() {
      return {
        printType: this.printType,
        useType: 'app',
        barcodePrintTempCode: this.curTemplate.tempCode,
        barcodePrintTemp: this.curTemplate.tempName,
        barCodeResult: this.data,
        orderNo: this.orderNo || ''
      }
    },
    filterDeviceList() {
      let devices = this.devicesList
      let name = this.filterName

      // 按名字过滤
      let filterDevices2
      if (name != '') {
        filterDevices2 = devices.filter((item) => {
          return item.name.indexOf(name) >= 0 || item.deviceId.indexOf(name) >= 0
        })
      } else {
        filterDevices2 = devices
      }
      // 根据广播数据提取MAC地址
      for (let i = 0; i < filterDevices2.length; i++) {
        if (filterDevices2[i].hasOwnProperty('advertisData')) {
          if (filterDevices2[i].advertisData.byteLength == 8) {
            filterDevices2[i].advMac = this.buf2hex(filterDevices2[i].advertisData.slice(2, 7))
          }
        }
      }
      console.log(filterDevices2);
      return filterDevices2
    }
  },
  watch: {
    goodsCode: {
      handler(val) {
        if (val) {
          this.getTemplateListByProduct()
        }
      },
      immediate: true
    },

    // 监听连接设备更改，通知父页面
    currentDevice(val) {
      this.$emit('changeDevice', val)
    },
    // 监听模板更改，通知父页面
    curTemplate(val) {
      if (val) {
        this.getTemplateDetail(val.tempCode)
      }
    }
  },
  beforeDestroy() {
    console.log('销毁注册事件')
    UniService.clearEventListener('findDeviceList')
  },
  methods: {
    nothing() {
      return
    },
    // 获取模板列表
    async getTemplateListByProduct() {
      this.loadingTemList = true
      const res = await getTemplateListByProduct({ businessTypeCode: this.businessTypeCode, goodsCode: this.goodsCode, useType: 'app' })
      this.templateList = res.data.result || []
      this.curTemplate = res.data.result[0] || {}
      this.$emit('changeTemplate', { template: this.curTemplate })
      this.loadingTemList = false
    },

    // 获取模板详情
    getTemplateDetail(tempCode) {
      this.loading = true
      getTemplateDetail({ tempCode })
        .then((res) => {
          this.template = res.data.result
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          uni.showToast({
            title: '获取模板详情失败',
            icon: 'none'
          })
        })
    },
    // 获取数据源信息
    async getDataSource() {
      // https://mom-dev.hdt.cosmoplat.com
      const host = process.env.NODE_ENV === 'development' ? 'https://mom-dev.hdt.cosmoplat.com' : window.location.origin
      const res = await http.request({
        method: 'POST',
        url: `${host}${this.template.apiPath}`,
        data: this.baseData
      })
      // this.dataSource = [{}]
      this.dataSource = res.data.result
      await this.formatData()
    },
    // 将数据源数据和模板绑定
    async formatData() {
      try {
        const printData = {
          tempContent: JSON.parse(this.template.tempContent),
          dataSource: this.dataSource
        }
        this.printData = printData
        const elements = this.printData.tempContent.elements.panels[0].printElements
        for (let i = 0; i < elements.length; i++) {
          const item = elements[i]
          const { options, printElementType } = item
          if (printElementType.type === 'image') {
            const imgData = await this.formatImg(options, options.src)
            options.imgData = imgData
          }
        }
       
      } catch (error) {
        this.loading = false
        uni.showToast({
          title: '模板信息配置错误！',
          icon: 'fail'
        })
      }
    },

    // 将图片格式base64像素点提取出来
    async formatImg(item, base64) {
      // 打印宽度须是8的整数倍，这里处理掉多余的，使得宽度合适，不然有可能乱码
      const mw = item.width % 8
      const w = mw === 0 ? item.width : mw <= 4 ? item.width - mw : item.width + 8 - mw
      // 等比算出图片的高度
      const h = Math.floor((item.height * w) / item.width)
      this.canvasWidth = w * 2
      this.canvasHeight = h * 2
      await this.$nextTick()
      return await this.imgToStr(base64, this.canvasWidth, this.canvasHeight)
    },

    /**
     * @param {Object} src 图片url
     * @param {Object} w 图片宽
     * @param {Object} h 图片高
     */
    imgToStr(src, w, h) {
      return new Promise((resolve, reject) => {
        const ctx = uni.createCanvasContext('tempCanvas')
        ctx.drawImage(src, 0, 0, w, h)
        ctx.draw()
        setTimeout(() => {
          uni.canvasGetImageData({
            canvasId: 'tempCanvas',
            x: 0,
            y: 0,
            width: w,
            height: h,
            success: (res) => {
              resolve(res)
            }
          })
        }, 50)
      })
    },
    showTemplatePanel() {
      this.showChangeTemplate = true
    },
    hideTemplatePanel() {
      this.showChangeTemplate = false
    },
    changeTemplate(val) {
      this.curTemplate = val
      this.$emit('changeTemplate', { template: val, print: this.print })
      this.hideTemplatePanel()
    },

    beforePrint() {
      this.$emit('beforePrint', async (res) => {
        if (res) {
          this.print()
        }
      })
    },
    print() {
      UniService.subscribe('getConnectedBluetoothDevices', {
        success: async (res) => {
          //若没有已连接设备，弹框搜索设备
          if (res.devices.length == 0) {
            this.waitPrint = true
            this.searchDevice()
          } else {
            if (!this.data || !this.data.length) {
              return uni.showToast({
                title: '打印数据获取失败',
                duration: 2000
              })
            }

            uni.showLoading({
              title: '数据加载中...'
            })
            await this.getDataSource()

            this.isPrinting = true
            await this.$nextTick()
            UniService.subscribe('print', { printData: this.printData, success: this.onPrintSuccess, fail: this.onPrintFail })

            this.isPrinting = false
            uni.hideLoading()
          }
        }
      })
    },

    async printEnd() {
      if (this.template.businessBackUrl) {
        // https://mom-dev.hdt.cosmoplat.com
        const host = process.env.NODE_ENV === 'development' ? 'https://mom-dev.hdt.cosmoplat.com' : window.location.origin
        const res = await http.request({
          method: 'POST',
          url: `${host}${this.template.businessBackUrl}`,
          data: this.baseData
        })
      }
    },

    // 发现新的蓝牙设备回调
    onGetDevice(res) {
      const { value } = res
      this.devicesList = value.filter((x) => x.name)
    },

    // 关闭搜索弹窗
    handleSearchClose() {
      this.stopSearchDevice()
      this.isShowSearch = false
    },

    //开始搜索设备
    searchDevice() {
      this.isShowSearch = true
      UniService.addEventListener('findDeviceList', this.onGetDevice)
      UniService.subscribe('searchBluetoothDevice', {
        success: () => {},
        fail: () => {}
      })
      this.isSearching = true
    },
    //停止搜索设备
    stopSearchDevice() {
      this.isSearching = false
      UniService.subscribe('stopSearchBluetoothDevice')
    },
    //点击连接设备
    handleConnectDevice(device) {
      this.handleSearchClose()

      uni.showLoading({
        title: '蓝牙连接中...'
      })

      this.currentDevice = device
      let deviceId = device.deviceId
      UniService.subscribe('connectBluetoothDevice', { deviceId, success: this.onConnectSuccess, fail: this.onConnectFail })
    },
    // 连接蓝牙成功
    onConnectSuccess(res) {
      uni.hideLoading()
      uni.showToast({
        title: '连接成功',
        duration: 2000
      })
      if (this.waitPrint) {
        this.print()
      }
      this.waitPrint = false
    },
    // 连接蓝牙失败
    onConnectFail(err) {
      uni.hideLoading()
      console.log('链接失败', err)
    },
    // 打印成功
    onPrintSuccess() {
      this.isPrinting = false
      console.log('打印成功')
      this.printEnd()
      this.$emit('onPrintSuccess')
    },
    // 打印失败
    onPrintFail() {
      console.log('打印失败')
      uni.showToast({
        title: '发送数据失败，重连蓝牙',
        duration: 2000
      })
      this.isPrinting = false
      this.$emit('onPrintFail')
    },
    buf2hex(buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('')
    }
  }
}
</script>
<style lang="scss" scoped>
.calm-printer {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 20000;
  .tempCanvas {
    position: fixed;
    top: 0;
    left: -100%;
  }
  .preview {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
  }

  &-btn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn {
    padding: 15upx 30upx;
    border: 2upx solid #333333;
    border-radius: 10upx;
    display: flex;
  }

  .calm-shadow {
    display: none;

    &.show {
      display: block;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .calm-modal {
        width: 680upx;
        height: 80%;
        padding: 24upx;
        box-sizing: border-box;
        overflow-y: auto;
        border-radius: 20upx;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        .calm-search-device {
          width: 100%;
          height: 100%;

          .calm-filter-wrap {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;

            .current-title {
              line-height: 70upx;
              font-size: 30upx;
              color: #999999;
            }

            & > slider {
              width: 90%;
              height: 90upx;
            }

            & > input {
              padding: 0 20upx;
              box-sizing: border-box;
              border-radius: 10upx;
              height: 90upx;
              width: 100%;
              border: 1upx solid #ebebeb;
            }
          }

          .calm-btn-wrap {
            width: 100%;
            height: 120upx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > view {
              flex: 1 1 auto;
              height: 80upx;
              line-height: 80upx;
              border-radius: 16upx;
              text-align: center;
              color: #ffffff;

              &.confirm-btn {
                background: #007aff;
                margin-right: 30upx;
              }

              &:nth-last-child(1) {
                background: #dd524d;
              }
            }
          }

          .calm-devices-wrap {
            height: calc(100% - 220upx);
            overflow-y: auto;
            padding: 10upx 20upx;
            box-sizing: border-box;
            border: 1upx solid #ebebeb;
            box-sizing: border-box;
            border-radius: 20upx;

            .empty-wrap {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              .empty-icon {
                width: 268upx;
                height: 240upx;
                background: url('./empty-icon.png') no-repeat;
                background-size: 100% 100%;
                margin-bottom: 26upx;
              }

              .empty-text {
                width: 100%;
                line-height: 50upx;
                font-size: 30upx;
                text-align: center;
                color: #999999;
              }
            }

            .calm-devices-item {
              width: 100%;
              border-bottom: 1upx solid #ebebeb;
              padding: 10upx 0;
              box-sizing: border-box;

              &:nth-last-child(1) {
                border-bottom: none;
              }

              & > view {
                width: 100%;
                font-size: 30upx;
              }
            }
          }
        }
      }
    }
  }
}

.calm-placeholder-class {
  font-size: 30upx;
  color: #999999;
}
</style>
