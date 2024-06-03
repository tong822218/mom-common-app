// 兼容 app
// 解决 App平台 v3 模式暂不支持在 js 文件中引用"uno.css" 请改在 style 内引用
const UnoCSS = require('unocss-webpack-uniapp2').default
module.exports = {
  devServer: {
    port: 3100,
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    plugins: [UnoCSS()],
  },
}
