/**
 * ui 控件文件保存在本地
 */
import { get, put, clear as CC } from './storages'
let uiInfo: uiInfo = {
  sleep: '',
  switch: '',
  minMoney: '',
  maxMoney: '',
  maxNumber: '',
  keyword: '',
  filterKeyword: []
}
export default uiInfo
/**
 *
 * @param arr 要保存的控件id列表
 */
export function saveUiValue (arr: [string]) {
  for (const item of arr) {
    let value = ui[item] && ui[item].getText && ui[item].getText()
    value = String(value)
    if (item == 'filterKeyword' && value != "") {
      log(value)
      value = value.replace(/[\s*|\r\n]/g,'')
      value = value.split(/[,|，]/)
      value = value.filter(elem=>{return elem})
    }
    if (value) {
      uiInfo[item] = value
    }
  }
  put('uiInfo', uiInfo)
}
/**
 * 从本地存储设置数据到界面
 */
export function setUiValue () {
  let uiInfo = get('uiInfo')
  log(uiInfo)
  if (uiInfo) {
    for (const key in uiInfo) {
      if (uiInfo.hasOwnProperty(key)) {
        log(key, uiInfo[key])
        let value = uiInfo[key]
        if (key == 'filterKeyword') {
          if (Array.isArray(value)) {
            value = value.join()
          }
        }
        //设置数据
        ui[key] && ui[key].text && uiInfo[key] && ui[key].text(value)
      }
    }
  }
}
export function getUiInfo () {
  return uiInfo
}
export function clear () {
  CC()
}
