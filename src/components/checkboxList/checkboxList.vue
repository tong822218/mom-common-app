<template>
  <view class="main" :style="showStyle">
    <u-input v-model="value" :type="type" :border="border" @input="searchList" />
    <view class="container">
      <u-checkbox-group @change="checkboxGroupChange">
        <u-checkbox style="width: 50%" @change="checkboxChange" v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item.name">{{ item.name }}</u-checkbox>
      </u-checkbox-group>
      <!-- <u-button @click="checkedAll">全选</u-button> -->
    </view>
    <view class="footer">
      <u-button type="primary" size="medium" @click="submitBtn">确认</u-button>
      <u-button type="error" size="medium" @click="cancleBtn">取消</u-button>
    </view>
  </view>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      versonUrl: '/wmsInventoryAllocateOutTask/query/version/list',
      showStyle: {
        display: 'none',
      },
      value: '',
      type: 'text',
      border: true,
      isAll: false,
      initList: [],
      list: [],
      changeList: [],
    }
  },
  methods: {
    show(versionList) {
      this.list = this.initList.slice()
      this.$request(this.versonUrl, {}, 'GET', res => {
        console.log(res)
        if (res.data.success) {
          this.showStyle.display = 'block'
          this.initList = []
          res.data.result.map(val => {
            if (versionList) {
              let vList = []
              vList = versionList.split(',')
              if (vList.indexOf(val) > -1) {
                this.initList.push({ name: val, checked: true })
              } else {
                this.initList.push({ name: val, checked: false })
              }
            } else {
              this.initList.push({ name: val, checked: false })
            }
          })

          this.list = this.initList.slice()
        } else {
        }
      })
    },
    searchList() {
      this.list = []
      this.initList.map(e => {
        if (e.name.includes(this.value)) {
          this.list.push(e)
        }
      })
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange(e) {
      this.changeList = e
    },
    // 选中某个复选框时，由checkbox时触发
    checkboxChange(e) {},
    // 全选
    // checkedAll() {
    //   if (!this.isAll) {
    //     this.list.map((val) => {
    //       val.checked = true;
    //     });
    //     this.isAll = true;
    //   } else {
    //     this.list.map((val) => {
    //       val.checked = false;
    //     });
    //     this.isAll = false;
    //   }
    // },
    clear() {
      this.list.map(val => {
        val.checked = false
      })
    },
    submitBtn() {
      this.$emit('changeList', this.changeList)
      this.showStyle.display = 'none'
    },
    cancleBtn() {
      this.showStyle.display = 'none'
    },
  },
  onLoad() {},
}
</script>
<style lang="scss" scoped="scoped">
.main {
  position: absolute;
  top: 8%;
  left: 10%;
  width: 76%;
  background: #fff;
  height: 60vh;
  border: 1px solid;
  border-radius: 8px;
  padding: 2%;
  z-index: 9999;
}
.container {
  height: 74%;
  margin: 4% 0;
  overflow-y: auto;
}
.footer {
  display: flex;
  position: absolute;
  bottom: 2%;
  width: 94%;
}
.u-checkbox-group {
  width: 100%;
}
::v-deep.u-checkbox__label {
  font-size: 18px;
}
</style>
