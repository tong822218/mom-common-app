<template>
  <view class="login">
    <view class="header">
      <u-navbar leftIconSize="25px" :leftText="$i18n.t('setting.configurationPage')" leftIconColor="#ffffff" :autoBack="true" :bgColor="bgColor"></u-navbar>
      <u--image class="top" :showLoading="true" :src="src" width="340rpx" height="470rpx"></u--image>
      <view class="contain">
        <u--input clearable class="common" v-model="ruleForm.ip" :placeholder="$i18n.t('setting.inputIp')" prefixIconStyle="font-size: 22px;color: #909399"></u--input>

        <u--input v-show="true" class="common" clearable :placeholder="$i18n.t('setting.enterTenantCode')" v-model="ruleForm.tenantCode" prefixIconStyle="font-size: 22px;color: #909399"></u--input>
        <u-button class="loginBtn" type="primary" shape="circle" @click="handleTest">{{ $i18n.t('setting.test') }}</u-button>
        <u-button class="setting" type="primary" shape="circle" @click="handleSubmit">{{ $i18n.t('common.confirm2') }}</u-button>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>
<script>
const img = require('@/static/login/top.png')
import { postExposePing } from '@/api/login'

export default {
  name: 'setting',
  data() {
    return {
      bgColor: 'transparent',
      ruleForm: {
        ip: 'https://mom-dev.hdt.cosmoplat.com',
        path: '',
        tenantCode: 'mom_1001',
      },
      loading: false,
      src: img,
    }
  },
  onLoad() {
    let tenantCode = uni.getStorageSync('tenantCode')
    this.ruleForm.tenantCode = tenantCode || this.ruleForm.tenantCode
    const url = uni.getStorageSync('adminUrl')

    if (!url) return

    this.ruleForm.ip = url
  },
  methods: {
    async handleTest() {
      let url = this.ruleForm.ip
      console.log(url)
      const res = await postExposePing(`${url}/platform`, this.ruleForm.tenantCode)
      if (res.data.success) {
        this.$refs.uToast.show({
          type: 'success',
          message: res.data.result,
        })
      } else {
        this.$refs.uToast.show({
          type: 'error',
          message: $i18n.t('setting.interfaceUnavailable'),
        })
      }
    },
    handleSubmit() {
      if (!this.ruleForm.tenantCode) {
        this.$refs.uToast.show({
          type: 'error',
          message: $i18n.t('setting.tenantCodeCannotBeEmpty'),
        })
        return
      }
      let url = this.ruleForm.ip

      uni.setStorageSync('adminUrl', url)

      this.$store.commit('SET_URL', url)
      uni.setStorageSync('tenantCode', this.ruleForm.tenantCode)

      uni.navigateBack()
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  .header {
    position: relative;
    width: 100%;
    height: 780rpx;
    background: url('@/static/login/bg.png');
    background-size: cover;
    background-repeat: no-repeat;

    .top {
      display: block;
      position: absolute;
      top: 100rpx;
      left: 200rpx;
      z-index: 3;
    }

    .contain {
      width: 90%;
      position: absolute;
      left: 5%;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 10px;
      backdrop-filter: blur(25px);
      background: #ffffff;
      top: 65%;
      padding: 5% 5% 5%;
      box-sizing: border-box;

      .common {
        height: 70rpx;
        border-radius: 70rpx;
        margin-top: 60rpx;
      }

      .loginBtn {
        margin-top: 120rpx;
        background: #2283e2;
        border: none;
        height: 88rpx;
      }

      .setting {
        margin-top: 50rpx;
        background: #00c280;
        border: none;
        height: 88rpx;
      }
    }
  }
}
</style>
