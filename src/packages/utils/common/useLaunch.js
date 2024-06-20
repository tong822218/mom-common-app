/**
 * 处理通过app进入h5时候传入的参数
 *
 */
import {getMenuList} from "./getMenuList.js"
export function useLaunch(store) {
  // 解析url中的参数
  const params = decodeURIComponent(location.href.split('?')[1])
  // 如果参数存在
  if (params && params !== 'undefined') {
    // 将参数按&分割
    const arr = params.split('&')
    console.log(arr)
    // 遍历参数
    arr.forEach((v) => {
      // 将参数按=分割
      const sub = v.split('=')
      switch (sub[0]) {
        case 'token':
          // 将token存储到本地
          uni.setStorageSync('token', sub[1])
          break
        case 'tenantCode':
          // 将tenantCode存储到本地
          uni.setStorageSync('tenantCode', sub[1])
          break
        case 'factory':
          // 将factory存储到本地
          const factory = JSON.parse(sub[1])
          const oldFactoryCode = uni.getStorageSync('factoryCode')
          // 切换工厂后，删除缓存的仓库信息
          if (oldFactoryCode !== factory.factoryCode) {
            uni.removeStorageSync('warehouse')
          }
          uni.setStorageSync('factoryCode', factory.factoryCode)
          store.commit('SET_FACTORY', factory)
          break
        case 'userInfo':
          // 将userInfo存储到本地
          const userInfo = JSON.parse(sub[1])
          store.commit('SET_USERINFO', userInfo)
          break
        case 'isAppStart':
          // 将isAppStart存储到本地
          store.commit('SET_ISAPPSTART', true)
          break
        case 'platform':
          // app基座是通过哪个平台启动的，默认是app
          store.commit('SET_PLATFORM', sub[1] || 'app')
          break
          case 'language':
          // app基座是通过哪个平台启动的，默认是app
          store.commit('SET_LANGUAGE', sub[1] || 'zh-Hans')
          break
        default:
          break
      }
    })
    // 获取菜单，已展平的
    // getMenuList(store)

  }
}
