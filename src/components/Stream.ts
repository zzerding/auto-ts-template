interface param {
  (param?: any, ...items): any
}
interface target {
  (param?: any, ...items): boolean
}
/**
 *
 * @param param {param} 要执行的操作
 * @param target {target} 操作完成的标志
 * @param maxRetryTimes  最大重试次数
 */
export default function stream (
  param: param,
  target: target,
  maxRetryTimes:number = 10
) {
  // log(String(maxRetryTimes),String(target))
  param()
  sleep(200)
  let isSuccess = target()
  while (maxRetryTimes > 0 && !isSuccess) {
    param()
    isSuccess = target()
    maxRetryTimes--
  }
}
