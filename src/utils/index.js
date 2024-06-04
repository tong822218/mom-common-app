//导出一个函数，功能是如果数字是一位数，则在前面补充一个0
export function addZero(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}
// 数字相加操作
export function numberAdd(num1, num2) {
  const result = (parseFloat(num1) + parseFloat(num2)).toFixed(2) // 保留两位小数
  return parseFloat(result) // 转换回Number类型
}