<template>
  <view class="login" v-if="!$store.getters.isAppStart">
    <view class="header">
      <view class="local" v-if="model">
        <text @click="handleLocal('zh-Hans')">中文</text>
        <text class="separate">/</text>
        <text @click="handleLocal('en')">English</text>
      </view>
      <view class="contain">
        <view class="title">{{ $t('sysName') }}</view>
        <u-input clearable class="common" border="bottom" v-model="ruleForm.account" :placeholder="$t('login.account')" prefixIconStyle="font-size: 22px;color: #909399">
          <image slot="prefix" :src="userIcon" mode="aspectFit" style="margin-right: 20rpx; width: 28rpx; height: 34rpx"></image>
        </u-input>
        <u-input class="common" clearable password border="bottom" :placeholder="$t('login.password')" v-model="ruleForm.password" prefixIconStyle="font-size: 22px;color: #909399">
          <image style="margin-right: 20rpx; width: 28rpx; height: 34rpx" slot="prefix" :src="passwordIcon" mode="aspectFit"></image>
        </u-input>
        <view class="rememberPsw">
          <checkbox-group @change="checkboxChange">
            <checkbox id="chkRem" type="checkbox" :checked="rememberPsw" @tap="rememberPsw = !rememberPsw" color="#2E98F5" />
            <!-- 记住账号密码 -->
            {{ $t('login.remember') }}
          </checkbox-group>
        </view>

        <u-button class="loginBtn" type="primary" :loading="loading" shape="circle" :loadingText="$t('login.logging')" @click="handleLogin">
          {{ $t('login.login') }}
        </u-button>
        <u-button class="setting" type="primary" shape="circle" @click="handleSetting">
          {{ $t('login.setting') }}
        </u-button>
      </view>
    </view>
  </view>
</template>
<script>
import { login, getUserInfo } from '@/api/login'
import { isEmail, isMobile } from '@/utils/judge'
import { loadLanguageAsync } from '@/lang/i18n-setup'
const userIcon = require('@/static/user.png')
const passwordIcon = require('@/static/password.png')
/*
  #ifdef MP-WEIXIN||APP-PLUS 代表在 微信和app内运行的条件判断
  #ifdef H5   代表在 H5运行的条件判断
  tenantCode  条件编译下 可以存在相同字段
*/
export default {
  name: 'login',
  data() {
    return {
      model: process.env.NODE_ENV == 'development',
      userIcon,
      passwordIcon,
      ruleForm: {
        account: '',
        password: '',
        type: 1, //0 手机号 1 工号 2 邮箱
        // #ifdef MP-WEIXIN||APP-PLUS
        tenantCode: 'mom',
        // #endif
        // #ifdef H5
        tenantCode: 'mom_1001',
        // #endif
        source: '1', //0 PC 1 移动端【不填会默认成0】【若以PC方式登陆，常用菜单会展示PC的菜单】
      },
      setInfo: {},
      loading: false,
      rememberPsw: true, //记住账号密码 默认勾选
    }
  },

  async onLoad() {
    if (this.$store.getters.isAppStart) {
      UniService.subscribe('goBack')
    }
    await loadLanguageAsync()
  },
  onShow() {
   
    this.ruleForm.tenantCode = uni.getStorageSync('tenantCode') || this.ruleForm.tenantCode
    console.log('环境', process.env.NODE_ENV)
  },
  mounted() {
    const HBusername = uni.getStorageSync('HBusername')
    //缓存的密码
    const HBpassword = uni.getStorageSync('HBpassword')
    //有缓存就赋值给文本没有就清空
    if (HBusername && HBpassword) {
      this.ruleForm.account = HBusername
      this.ruleForm.password = HBpassword
    } else {
      this.ruleForm.account = ''
      this.ruleForm.password = ''
    }
  },
  methods: {
    handleLocal(lang) {
      const currentLang = this.$store.getters.language
      if (lang == currentLang) return
      this.$store.commit('SET_LANGUAGE', lang)
      loadLanguageAsync()
    },
    checkboxChange(e) {
      if (e.detail.value.length == 1) {
        //获取缓存的账号 赋值
        uni.getStorageSync('HBusername', this.ruleForm.account)
        uni.getStorageSync('HBpassword', this.ruleForm.password)
      } else {
        //销毁
        uni.removeStorageSync('HBusername')
        uni.removeStorageSync('HBpassword')
      }
    },
    auth() {
      if (!this.ruleForm.account) {
        uni.$u.toast(this.$t('login.accountRule'))
        return false
      }
      if (!this.ruleForm.password) {
        uni.$u.toast(this.$t('login.passwordRule'))
        return false
      }
      return true
    },
    async handleLogin() {
      if (this.auth()) {
        this.loading = true
        const { account } = this.ruleForm
        // isEmail, isMobile
        const type = isEmail(account) ? 2 : isMobile(account) ? 0 : 1
        this.ruleForm.type = type
        try {
          const res = await login(this.ruleForm)
          this.$store.commit('SET_TOKEN', res.data.result)
          uni.setStorageSync('token', res.data.result)
          const info = await getUserInfo()

          this.$store.commit('SET_USERINFO', info.data.result)
          this.$store.commit('SET_OPERATORINFO', {})
          //勾选缓存账号和密码
          if (this.rememberPsw) {
            uni.setStorageSync('HBusername', this.ruleForm.account)
            uni.setStorageSync('HBpassword', this.ruleForm.password)
          } else {
            //销毁缓存
            uni.removeStorageSync('HBusername')
            uni.removeStorageSync('HBpassword')
          }
          uni.switchTab({
            url: '/pages/index/index',
          })
        } finally {
          this.loading = false
        }
      }
    },

    handleSetting() {
      uni.navigateTo({
        url: '/pages/setting/index',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  background: #fefefe;

  .header {
    position: relative;
    width: 100%;
    //  height: 780rpx;
    background: url('@/static/login/login.png'); //@/static/login/login.png @/static/common/top-bg.png
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: 100%;
    background-position-x: center;

    .local {
      display: flex;
      justify-content: flex-end;
      padding: 0 5%;
      box-sizing: border-box;
      color: #ffffff;
      font-size: 28rpx;
      padding-top: calc(var(--status-bar-height) + 10px);

      .separate {
        margin: 0 5px;
      }
    }

    .title {
      box-sizing: border-box;
      text-align: center;
      font-size: 36rpx;
      color: #333333;
      margin-bottom: 60rpx;
    }

    .contain {
      width: 90%;
      position: absolute;
      left: 5%;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08);
      border-radius: 30px;
      background: #ffffff;
      top: 40%;
      padding: 5%;
      padding-bottom: 90rpx;
      box-sizing: border-box;

      .common {
        height: 70rpx;

        margin-top: 40rpx;
      }

      .rememberPsw {
        padding: 30rpx 8rpx;
        color: #9d9d9d;
        font-size: 28rpx;
      }

      .loginBtn {
        margin-top: 40rpx;
        height: 92rpx;
        background: linear-gradient(270deg, #4ca8fa 0%, #1882e5 100%);
        box-shadow: 0px 3px 9px -4px #135087;
        border-radius: 46rpx;
        border: none;
        font-size: 32rpx;
      }

      .setting {
        margin-top: 28rpx;
        border: none;
        height: 92rpx;
        background: linear-gradient(270deg, #45de82 0%, #14c589 100%);
        box-shadow: 0px 3px 9px -4px #135087;
        border-radius: 46rpx;
        font-size: 32rpx;
      }
    }
  }
}
</style>
