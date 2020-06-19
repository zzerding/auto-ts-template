/**
 * 四点生成贝塞尔曲线
 *
 * 传入值：四点坐标
 * 返回值：曲线数组
 */
function bezierCreate (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number
): Array<GesturePoint> {
  var h = 100
  var cp = [
    { x: x1, y: y1 + h },
    { x: x2, y: y2 + h },
    { x: x3, y: y3 + h },
    { x: x4, y: y4 + h }
  ]
  var numberOfPoints = 100
  var curve = []

  var dt = 1.0 / (numberOfPoints - 1)
  for (var i = 0; i < numberOfPoints; i++) {
    let ax: number, bx: number, cx: number
    let ay: number, by: number, cy: number
    let tSquared: number, tCubed: number
    let result_x: number, result_y: number

    cx = 3.0 * (cp[1].x - cp[0].x)
    bx = 3.0 * (cp[2].x - cp[1].x) - cx
    ax = cp[3].x - cp[0].x - cx - bx
    cy = 3.0 * (cp[1].y - cp[0].y)
    by = 3.0 * (cp[2].y - cp[1].y) - cy
    ay = cp[3].y - cp[0].y - cy - by

    var t = dt * i
    tSquared = t * t
    tCubed = tSquared * t
    result_x = ax * tCubed + bx * tSquared + cx * t + cp[0].x
    result_y = ay * tCubed + by * tSquared + cy * t + cp[0].y
    curve[i] = {
      x: result_x,
      y: result_y
    }
  }

  var array: Array<GesturePoint> = []
  for (var i = 0; i < curve.length; i++) {
    try {
      var j = i < 100 ? i : 199 - i
      var xx: number = parseInt(curve[j].x)
      var yy: number = parseInt(String(Math.abs(100 - curve[j].y)))
    } catch (e) {
      break
    }
    array.push([xx, yy])
  }
  return array
}

/**
 *
 * @param sx 起点x坐标
 * @param sy 起点y坐标
 * @param ex 终点x坐标
 * @param ey 终点y坐标
 * @param t 平台滑动时间
 */
export default function randomSwipe (
  sx: number,
  sy: number,
  ex: number,
  ey,
  t: number = 500
):void {
  // 设置随机滑动时长范围
  var timeMin = t - t / 2
  var timeMax = t + t / 2
  // 设置控制点极限距离
  var leaveHeightLength = 500

  if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
    var my = (sy + ey) / 2
    var y2 = my + random(0, leaveHeightLength)
    var y3 = my - random(0, leaveHeightLength)

    var lx = (sx - ex) / 3
    if (lx < 0) {
      lx = -lx
    }
    var x2 = sx + lx / 2 + random(0, lx)
    var x3 = sx + lx + lx / 2 + random(0, lx)
  } else {
    var mx = (sx + ex) / 2
    var x2 = mx + random(0, leaveHeightLength)
    var x3 = mx - random(0, leaveHeightLength)

    var ly = (sy - ey) / 3
    if (ly < 0) {
      ly = -ly
    }
    var y2 = sy + ly / 2 + random(0, ly)
    var y3 = sx + ly + ly / 2 + random(0, ly)
  }

  var time = [0, random(timeMin, timeMax)]
  var track:Array<GesturePoint> = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)

  // log('控制点 A 坐标：' + x2 + ',' + y2)
  // log('控制点 B 坐标：' + x3 + ',' + y3)
  // log('滑动时长：' + time[1])
  // log('坐标组',...track)
  try {
    gestures([0, random(timeMin, timeMax), ...track])
  } catch (error) {
    log(error)
  }
 
}
