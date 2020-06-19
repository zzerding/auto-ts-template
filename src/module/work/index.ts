//加载滑动插件
import randomSwipe from '@/components/RandomSwipe'

//加载悬浮窗
import SuspendedBall from '@/module/SuspendedBall'

// 添加点击滑动插件
import { clickDom } from '@/components/Click'
import palyMp3 from '@/components/PlayMp3'
import config from '@/config'
export default class Work {
  constructor () {
  }

  run () {
    //主要逻辑
    toast('软件已启动')
  }
}
