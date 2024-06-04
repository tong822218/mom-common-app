import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import Bluetooth from './modules/bluetooth'
import getters from './getters'
import language from './modules/language'
//汇总入库的仓库，跟入库类型缓存
import wmsSummaryInStorage from './modules/wmsSummaryInStorage'
import cacheStore from './cacheStore.js'
import { globalStore } from '@/packages'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user,
    Bluetooth,
    language,
    globalStore,
    wmsSummaryInStorage,
  },
  state: {
    sysinfo: uni.getSystemInfoSync(), //系统信息
  },
  getters,
  plugins: [],
})

// 刷新页面缓存住vuex中的内容
cacheStore(store)

export default store
