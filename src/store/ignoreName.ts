import { remove, insert, clear, queryAll, queryAllName } from '@/store/db'
let ignoreNameList: string[] //过滤列表
let isInit = false
if (!isInit) {
    isInit = true
    ignoreNameList = queryAllName()
}
export function getList (): string[] {
  return ignoreNameList
}
/**
 * @param 添加名字到过虑列表
 */
export function pushName (name: string) {
  if (ignoreNameList.indexOf(name) >= 0) {
    return false
  } else {
    ignoreNameList.push(name)
    return insert(name) > 0 ? true : false
  }
}
/**
 *
 * @param name 判断名字是否在列表里
 */
export function nameExists (name): boolean {
  return ignoreNameList.some(elem => {
    return name == elem
  })
}

export default ignoreNameList
