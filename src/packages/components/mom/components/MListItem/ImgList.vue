<template>
  <view class="m-list-item-img-list">
    <view class="flex text-5A6F82 text-28rpx py20rpx">
      <text>{{ text }}</text>
      <text v-if="edit">({{ imageUrl.length }}/{{ maxCount }})</text>
      <text v-else-if="imageUrl.length">({{ imageUrl.length }})</text>
    </view>
    <view class="flex">
      <u-upload v-if="edit" :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple :maxCount="maxCount"></u-upload>
      <u-album v-else :urls="imageUrl" :singleSize="80" :multipleSize="80" :rowCount="4"></u-album>
    </view>
  </view>
</template>

<script>
import { adminUrl } from '../../../../global.js'
export default {
  name: 'MListItemImgList',
  props: {
    text: String,
    value: String,
    // 是否编辑模式
    edit: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: '80rpx'
    },
    // 最多支持图片数量
    maxCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      imageUrl: [],
      fileList: []
    }
  },
  watch: {
    value: {
      handler(val) {
        const arr = val?.split(',')
        this.imageUrl = arr && arr[0] ? arr : []
      },
      immediate: true
    }
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.fileList.splice(event.index, 1)
      this.imageUrl.splice(event.index, 1)
      this.$emit('input', this.imageUrl.join(','))
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      let fileListLen = this.fileList.length
      lists.map((item) => {
        this.fileList.push({
          ...item,
          status: 'uploading',
          message: '上传中'
        })
      })
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url)
        let item = this.fileList[fileListLen]
        this.fileList.splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: 'success',
            message: '',
            url: result
          })
        )
        fileListLen++
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: `${adminUrl}file`,
          filePath: url,
          name: 'file',
          header: {
            Satoken: `${this.$store.getters.token}`
          },
          formData: {
            bucket: 'devicepda'
          },
          success: (res) => {
            setTimeout(() => {
              this.imageUrl.push(JSON.parse(res.data).result.path)
              this.$emit('input', this.imageUrl.join(','))
              resolve()
            }, 1000)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.m-list-item-img-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-bottom: solid 1px #f3f3f5;
  padding-bottom: 33rpx;
  ::v-deep .u-album {
    .u-album__row__wrapper {
      uni-image {
        border-radius: 17rpx;
      }
    }
  }
}
</style>
