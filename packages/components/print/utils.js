import html2canvas from 'html2canvas'
/**
 * 将html转成base64
 * @param {} node html节点
 * @param {*} quality 图片质量默认 1.0
 */
export function dom2base64(node, quality = 1.0) {
  return new Promise((res, rej) => {
    html2canvas(node)
      .then((canvas) => {
        console.log(canvas)
        let image = new Image()
        image.src = canvas.toDataURL('image/png')
        image.onload = function () {
          let w = this.width, //　　图片的宽
            h = this.height //　　图片的长
          if (w > 400 || h > 400) {
            // 压缩图片时最长的一条边长是多少，通过计算获取该图片等比例缩放时另一条边的长度
            if (w >= h) {
              h = parseInt((400 * h) / w)
              w = 400
            } else {
              w = parseInt((400 * w) / h)
              h = 400
            }
          }
          let ctx = canvas.getContext('2d')
          canvas.width = w
          canvas.height = h
          ctx.drawImage(this, 0, 0, w, h)
          res(canvas.toDataURL('image/png', quality))
        }
      })
      .catch((e) => {
        console.log(e)
        rej(e)
      })
  })
}

/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio
  }
  return 1
}
/**
 *  将传入值转为整数
 */
function parseValue(value) {
  return parseInt(value, 10)
}
/**
 * 绘制canvas
 */
export async function drawCanvas(dom) {
  // 获取想要转换的 DOM 节点
  const box = window.getComputedStyle(dom)
  // DOM 节点计算后宽高
  const width = parseValue(box.width)
  const height = parseValue(box.height)
  // 获取像素比
  const scaleBy = DPR()
  console.log(scaleBy)
  // 创建自定义 canvas 元素
  const canvas = document.createElement('canvas')

  // 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
  const { width: w, height: h } = to8(width, height)
  canvas.width = w
  canvas.height = h
  // 设定 canvas css宽高为 DOM 节点宽高
  // const { width: w2, height: h2 } = to8(width, height)
  // canvas.style.width = `${w2}px`
  // canvas.style.height = `${h2}px`
  // 获取画笔
  const context = canvas.getContext('2d')

  // 将所有绘制内容放大像素比倍
  // context.scale(scaleBy, scaleBy)

  // 将自定义 canvas 作为配置项传入，开始绘制
  await html2canvas(dom, { canvas })
  return context.getImageData(0, 0, w, h)
}

function to8(w, h) {
  let width = Math.floor(w)
  let height = Math.floor(h)
  while (width % 8 !== 0) {
    width--
    height--
  }
  return { width, height }
}
