/**
 * 通知基座，调用扫码功能
 * @param {} param0
 * @returns
 */
export function mpaasScan({ success, fail, ...reset }) {
  const defaultConfig = {
    // 扫码识别类型，参数可多选，qrCode、barCode，不设置，默认识别所有
    scanType: ['qrCode', 'barCode'],
    // 是否隐藏相册，默认false不隐藏
    hideAlbum: false,
  }
  const params = { ...defaultConfig, ...reset }

  UniService.subscribe('scanCode', {
    success: e => {
      console.log(JSON.stringify(e))
      success && success(e)
    },
    fail: e => {
      console.log(JSON.stringify(e))
      fail && fail(e)
    },
    params,
  })
}
