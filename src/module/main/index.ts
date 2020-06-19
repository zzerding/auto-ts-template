// 主函数申请权限
import Work from '@/module/work/index'
import store from '@/store'
let init: boolean = false
let work = new Work()
/**
 * 工作模块
 */
export function runWork () {
  threads.start(() => {
    sleep(1000)
    try {
      work.run()
    } catch (error) {
      // toastLog('脚本出错')
      console.error('workIndex', error)
    }
  })
}

/**
 * 主模块接口
 */
import core from '@/components/core'
export default  function Main () {
  //判断软件是否过期
  if (store.isTimeout) {
    return alert('软件已过期或者网络未链接')
  }
  //判断是否初始化权限
  core(true)
  init = true
  runWork()
}
