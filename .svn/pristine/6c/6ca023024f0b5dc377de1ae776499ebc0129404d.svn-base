/**
 * @param {名称}} str
 * @param {多少字限制} num
 * @param {是否必填} flag
 * @param {是否必填} fn 如果传递函数 则是检验名称是否重复
 */
export function valiName (str, num, flag, fn) {
  return (_, val, callback) => {
    if (!val) {
      callback(new Error('请填写' + str))
      return
    }
    if (val.indexOf(' ') !== -1) {
      callback(new Error(str + '中间不允许有空格'))
    }
    callback()
  }
}
