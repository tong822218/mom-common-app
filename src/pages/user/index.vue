<template>
  <view class="user">
    <view class="header">
      <u-navbar title="我的" :placeholder="true" :fixed="true" :bgColor="bg" :safeAreaInsetTop="true" :titleStyle="{ color: '#fff' }">
        <template slot="left">
          <view></view>
        </template>
        <template slot="right">
          <image class="set-img" :src="setting" @click="settingUser"></image>
        </template>
      </u-navbar>
      <view class="contain">
        <view class="cell-bg">
          <view class="head-portrait"></view>
          <view class="user-name">
            <view class="user-name-content">
              {{ userInfo.username }}
            </view>
          </view>
          <view class="user-phone">
            <view>
              {{ userInfo.mobile }}
            </view>
          </view>
        </view>
        <view class="cell">
          <view class="cell-content nickname">
            <view v-if="!isEdit">
              {{ userInfo.username }}
            </view>
            <u-input v-else v-model="username"></u-input>
          </view>
          <view class="cell-content telphone">
            <view v-if="!isEdit">
              {{ userInfo.mobile }}
            </view>
            <u-input v-else v-model="mobile"></u-input>
          </view>
          <view class="cell-content email">
            <view v-if="!isEdit">
              {{ userInfo.email }}
            </view>
            <u-input v-else v-model="email"></u-input>
          </view>
        </view>
        <view class="cell">
          <view class="cell-content jobnum">
            <view v-if="!isEdit">{{ userInfo.jobNumber }}</view>
            <u-input v-else v-model="jobNumber"></u-input>
          </view>
          <view class="cell-content department">
            <view v-if="!isEdit">
              {{ email }}
            </view>
            <u-input v-else v-model="email"></u-input>
          </view>
        </view>

        <view class="cell">
          <view class="flex">
            <u-icon size="28" name="tags" />
            <view class="mar-l-18">{{ $i18n.t('user.currentVersion') }}: {{ version }}</view>
          </view>
        </view>
        <u-button v-if="isEdit" type="primary" :text="$i18n.t('user.save')" shape="circle" @click="saveHandle"></u-button>
      </view>
    </view>
    <view class="log">
      <u-button :text="$i18n.t('user.exit')" class="logout" @click="handleLogout"></u-button>
    </view>
  </view>
</template>
<script>
const setting = require('@/static/common/setting.png')

export default {
  name: 'user',
  data() {
    return {
      bg: 'rgba(40,136,226,0)',
      bgColor: 'transparent',
      username: '',
      mobile: '',
      email: '',
      jobnum: '',
      tenantCode: '',
      department: '',
      isEdit: false,
      setting,
      version: '',
    }
  },
  computed: {
    userInfo() {
      this.username = this.$store.getters.userInfo.username
      this.mobile = this.$store.getters.userInfo.mobile
      this.email = this.$store.getters.userInfo.email
      this.tenantCode = this.$store.getters.userInfo.tenantCode
      this.jobNumber = this.$store.getters.userInfo.jobNumber
      return this.$store.getters.userInfo
    },
  },
  onPageScroll(res) {
    //获取距离顶部距离
    const scrollTop = res.scrollTop
    if (scrollTop >= 0) {
      // 导航条颜色透明渐变
      if (scrollTop <= 56) {
        this.bg = 'rgba(40,136,226,0)'
      } else {
        this.bg = 'rgba(40,136,226,1)'
      }
    }
  },

  methods: {
    settingUser() {
      this.$u.route({
        url: 'pages/setting/user',
        params: {
          user: JSON.stringify(this.$store.getters.userInfo),
        },
      })
    },
    handleLogout() {
      //缓存的账号
      const HBusername = uni.getStorageSync('HBusername')
      //缓存的密码
      const HBpassword = uni.getStorageSync('HBpassword')
      //缓存的url
      const url = uni.getStorageSync('adminUrl')
      //缓存的tenantCode
      const tenantCode = uni.getStorageSync('tenantCode')
      //全部清理掉
      uni.clearStorageSync()
      uni.setStorageSync('HBusername', HBusername)
      uni.setStorageSync('HBpassword', HBpassword)
      uni.setStorageSync('adminUrl', url)
      uni.setStorageSync('tenantCode', tenantCode)
      uni.reLaunch({
        url: '/pages/login/index',
      })
    },
    // 获取版本号
    getVersion() {
      // 获取本地应用资源版本号
      plus.runtime.getProperty(plus.runtime.appid, info => {
        // console.log(JSON.stringify(info));
        console.log('info', info)
        this.version = info.version
      })
    },
  },
  onShow() {
    // #ifdef MP-WEIXIN||APP-PLUS
    this.getVersion()
    //#endif
  },
}
</script>
<style lang="scss" scoped>
.user {
  .header {
    position: relative;
    width: 100%;
    background: url('@/static/common/top-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    .set-img {
      width: 50rpx;
      height: 50rpx;
      position: absolute;
      right: 50%;
      top: 20%;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .mar-l-18 {
    margin-left: 15rpx;
  }
  .contain {
    width: 90%;
    position: relative;
    left: 5%;
    top: 180rpx;
    box-sizing: border-box;
    margin-bottom: 184rpx;
  }
  .cell-bg {
    background: url('@/static/user/cell-bg.png') no-repeat center;
    background-size: 100%;
    border-radius: 16rpx;
    padding: 5% 5% 5%;
    position: relative;
  }
  .head-portrait {
    height: 168rpx;
    width: 168rpx;
    background: #eee;
    border-radius: 50%;
    position: absolute;
    border: 8px solid #fff;
    box-sizing: border-box;
    bottom: 68%;
  }
  .user-name {
    height: 66rpx;
    font-size: 48rpx;
    font-weight: 400;
    color: #26292c;
    line-height: 66rpx;
    margin: 96rpx 26rpx 12rpx 26rpx;
    display: flex;
    align-items: flex-end;
    .user-name-content {
      margin-right: 26rpx;
    }
  }
  .user-phone {
    height: 44rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 44rpx;
    margin-left: 26rpx;
    margin-bottom: 58rpx;
  }
  .cell {
    border-radius: 16rpx;
    background: #fff;
    padding: 34rpx 28rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    margin-bottom: 24rpx;
    &:last-child {
      margin: 0;
    }
    .cell-content {
      margin-bottom: 60rpx;
      display: flex;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      &::before {
        content: '';
        display: inline-block;
        width: 36rpx;
        height: 36rpx;

        vertical-align: middle;
        margin-right: 32rpx;
      }
    }
    .nickname::before {
      background: url('@/static/user/nickname.png') no-repeat center;
      background-size: 100%;
    }
    .telphone::before {
      background: url('@/static/user/telphone.png') no-repeat center;
      background-size: 100%;
    }
    .email::before {
      background: url('@/static/user/email.png') no-repeat center;
      background-size: 100%;
    }
    .jobnum::before {
      background: url('@/static/user/jobnum.png') no-repeat center;
      background-size: 100%;
    }
    .company::before {
      background: url('@/static/user/company.png') no-repeat center;
      background-size: 100%;
    }
    .department::before {
      background: url('@/static/user/department.png') no-repeat center;
      background-size: 100%;
    }
  }
  .log {
    padding-top: 60rpx;
  }
  .logout {
    margin-top: 40rpx;
    height: 100rpx;
    ::v-deep .u-button__text {
      font-size: 32rpx !important;
    }
  }
}
</style>
