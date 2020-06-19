/**
 * 请求无障碍权限
 */
 function openService (): boolean {
  if (auto.service == null) {
    let isOpen =  confirm('是否去打开无障碍权限?')
    if (isOpen) {
      app.startActivity({
        action: 'android.settings.ACCESSIBILITY_SETTINGS'
      })
      // 返回ui界面触发回调
      ui.emitter.on('resume', function () {
        auto.service ? toast('权限已开启') : toastLog('无障碍权限未打开')
      })
    } else {
      toastLog('不打开权限脚本无法正常运行')
    }
  } else {
    return true
  }
}
/**
 * 请求截图权限
 */
 function openCap (): boolean {
  log('run2')
  let isOpen = confirm('脚本运行要求截图权限是否打开')
  if (isOpen) {
    if (!images.requestScreenCapture()) {
      toastLog('请求截图失败')
      return false
    } else {
      return true
    }
  } else {
    toastLog('截图权限是必须的!!!')
    return false
  }
}
/**
 * 打开关键权限
 * @param service 无障碍权限
 * @param cap 截图权限
 */
export default function(service:boolean,cap:boolean=false){
  if(service){
    if (!openService()) {
      return
    }
  }
  if(cap){
    if (!openCap()) {
      return
    }
  }
}