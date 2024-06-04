import presetWeapp from 'unocss-preset-weapp'
import { defineConfig } from 'unocss'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { transformerAttributify, presetWeappAttributify } = extractorAttributify()

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp({
      // h5兼容
      // 只开发小程序可删除
      platform: 'uniapp',
      isH5: process.env.UNI_PLATFORM === 'h5',
      // whRpx: false,
    }),

    // attributify autocomplete
    presetWeappAttributify(),
  ],
  theme: {
    colors: {
      fff: '#fff',
      'bubble-gum': '#ff77e9',
      '5A6F82': '#5A6F82',
      333: '#333333',
      999: '#999999',
      F3F3F5: '#F3F3F5',
      '0066FF': '#0066FF',
    },
  },
  // 自定义规则
  rules: [
    // 静态规则
    ['bg-#fff', { background: '#fff' }],
    ['text-#5A6F82', { color: '#5A6F82' }],
    // 动态规则
    // [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` }), { layer: 'my-layer' }],
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500_10',
      center: 'flex justify-center items-center',
      'start-center': 'flex justify-start items-center',
      'end-center': 'flex justify-end items-center',
      'between-center': 'flex justify-between items-center',
      'around-center': 'flex justify-around items-center',
      border: 'border-1 border-solid border-red',
      'border-bottom': 'border-b border-b-solid border-b-#F3F3F5',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
})
