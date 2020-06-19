import { get, put } from './storages'
let cacheKey = 'cacheTitle'
let cacheTitle = {}
let dayNow = String(new Date().getDate())
let cacheDay = get('cacheDay')
//从缓存中取得数据
function init(){
    let cache = get(cacheKey)
    log('cache',cache)
    if(cache) cacheTitle = cache
}
//每天清理缓存的标题
if (cacheDay) {
  if (cacheDay != dayNow) put(cacheKey, '')
} else {
  put('cacheDay', dayNow)
}
export default cacheTitle
/**
 * @把标题加入缓存列表
 * @param title {string}
 */
export function set (title) {
  cacheTitle[title] = true
  put(cacheKey, cacheTitle)
  console.info('标题',title,'已加入缓存')
}
/**
 * @检测缓存是否有标题
 * @param title 
 */
export function has (title) {
  return title in cacheTitle
}
