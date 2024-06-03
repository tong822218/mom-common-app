/**
 * uniapp app端 和 web-view h5端通信类
 */
class UniService {
  VALUE = null // 调取uni服务后回来的值
  UNI = window.webUni // 保存uni的值
  Dep = {} // 调度中心，状态变更通知更新
  // 缓存，主要是进入h5页面立即要更新的话，用它缓存下来 等uniapp webView可通信后执行
  // 因为一开始调用的时候，webview还没加载完 通信是不成功的
  cache = []
  constructor() {
    // 监听Uni向H5发送结果的回调
    this._ListenDocument()
    // 监听可通信后的回调，主要用于cache缓存的执行
    this._ListenUniLinkH5()
  }

  /**
   * 要调用uni的方法
   * @type {*} 你sdk.js里面写的方法名
   * @param {*} params 参数
   */
  subscribe = (type, params = {}) => {
    if (!type) {
      throw new Error('_Subscribe需要接受一个type属性进行注册')
    }
    //  默认从参数中解构出成功与失败的回调，待响应结果之后进行推送
    let { success, fail, ...argsObj } = params

    if (!argsObj) argsObj = {}

    success = success && typeof success === 'function' ? success : () => this.VALUE
    fail = fail && typeof fail === 'function' ? fail : () => this.VALUE

    // 注册该类型的属性
    !this.Dep[type] && (this.Dep[type] = [])

    // 默认0 是成功的回调  1是失败的回调
    this.Dep[type].push(success)
    this.Dep[type].push(fail)
    this.SendToUni(type, argsObj)
  }

  /**
   * 添加uniapp要调用的h5方法
   * @type {*} 事件名称
   * @param {*} params 参数
   */
    addEventListener = (type, fun) => {
      if (!type) {
        throw new Error('_Subscribe需要接受一个type属性进行注册')
      }
      if (typeof fun !== 'function') {
        throw new Error('_Subscribe需要接受一个function类型的参数')
      }
  
      // 注册该类型的属性
      this.Dep[type] = []
      this.Dep[type].push(fun)
    }

  /**
   * 删除uniapp要调用的h5方法
   * @type {*} 事件名称
   * @param {*} params 参数
   */
    clearEventListener = (type) => {
      if (!type) {
        throw new Error('_Subscribe需要接受一个type属性进行注册')
      }
      
      // 注册该类型的属性
      this.Dep[type] = []
    }
  
  
  /**
   *  获取Uni传输过来的数据
   * @param {*} type uni服务类型
   * @param {*} params 参数
   * @returns null
   */
  receiveUniInfo = (e) => {
    this.VALUE = e.detail.msg || {}
    let { status = 'fail', type } = this.VALUE

    if (!this.Dep[type] || !this.Dep[type].length || this.Dep[type] == null) {
      return 
    }
    // 只有一个函数代表是uniapp主动发起的调用比如 找到了新的蓝牙设备列表需要告诉h5显示
    if(this.Dep[type].length === 1){
      this.Dep[type][0](this.VALUE)
      return 
    }

    if (status === 'success') {
      this.Dep[type][0](this.VALUE)
    }
    if (status === 'fail') {
      this.Dep[type][1](this.VALUE)
    }
    this.Dep[type] = []
  }

  /**
   * 通信：发送信息给uni
   * @param {*} type uni服务类型
   * @param {*} params 参数
   * @returns null
   */
  SendToUni = (type, params) => {
    let serviceUni = this.UNI || window.webUni
    this.VALUE = null
    serviceUni.postMessage({
      data: {
        type,
        params
      }
    })
  }

  /**
   * 这个是如果一开始调用的话 则将它加入到缓存中
   */
  setInitCallBack = (cbArr) => {
    if (cbArr && Array.isArray(cbArr)) {
      cbArr.forEach((el) => {
        if (typeof el === 'function') {
          this.cache.push(el)
        }
      })
    }
  }

  /**
   * 通信：监听document getUNIMsg
   * @param {*} type uni服务类型
   * @param {*} params 参数
   * @returns null
   */
  _ListenDocument = () => {
    document.addEventListener('noticeH5', this.receiveUniInfo, false)
  }

  /**
   * 通信：监听 通信桥梁是否搭建完成
   * @returns null
   */
  _ListenUniLinkH5 = () => {
    document.addEventListener('UniAppJSBridgeReady', this._UniAppJSBridgeReady, false)
  }

  /**
   * 缓存钩子，有则取出来执行
   * @returns null
   */
  _UniAppJSBridgeReady = () => {
    if (this.cache.length) {
      this.cache.forEach((el) => {
        el()
      })
      this.cache = []
    }
  }
}

export function useUniService() {
  if (!window.UniService) {
    window.UniService = new UniService()
  }
}
