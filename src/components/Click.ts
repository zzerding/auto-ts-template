/**
 *
 * @param x 要点击的坐标x
 * @param y 要点击的坐标y
 * @param offsetMix 坐标随机最小偏移默认为-3
 * @param offsetMax 坐标随机最大偏移默认为3
 * @param delay  坐标随机点击时长最认为10
 */
// import 'core-js/es/map'

let cache = new Map() 

export function randomClick (
  x,
  y,
  offsetMix: number = 3,
  offsetMax: Number = 3,
  delay = 10
): boolean {
  x = x + random(-3, 3)
  y = y + random(-3, 3)
  delay = random(delay - delay / 2, delay + delay + 2)
  return press(x, y, delay)
}
/**
 *
 * @param uiSelect 要点击的选择器如 text('QQ')
 * @param isCache 是否缓存坐标默认为true
 */
export function clickDom (uiSelect: any,isCache = true): boolean {
  let strSelector = String(uiSelect)

  if (cache.has(strSelector) && isCache) {

    let { x, y } = cache.get(strSelector)
    log(strSelector + '坐标已缓存: ',x,y)
    return randomClick(x, y)
  }
  try {
    let rect = null
    try {
      rect = uiSelect.bounds()
    } catch (error) {
      rect = uiSelect.findOne(1000) && uiSelect.findOne().bounds()
    }
    if (!rect) {
      log('click坐标不存在', uiSelect)
      return false
    }
    if(isCache){
      cache.set(strSelector, { x: rect.centerX(), y: rect.centerY() })
    }
    return randomClick(rect.centerX(), rect.centerY())
  } catch (error) {
    log('clickDom', uiSelect)
    // throw new error(error)
  }
}
