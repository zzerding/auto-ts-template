// 悬浮窗
import store from '@/store'
export default class SuspendedBall {
  window: any
  constructor () {
    this.window = floaty.window(`
      <frame>
        <vertical  alpha='0.6'>
          <text id='name'  textSize='9'>name</text>
          <horizontal>
            <button id='exit' text='exit'   w='50'
            h='30'  textSize='9'></button>
            <button id='set' text='set'  w='50'
            h='30'  textSize='9'></button>
          </horizontal>
        </vertical>
      </frame>
      `)
    this.window.setAdjustEnabled(false)
    this.window.setPosition(0, 10)
    // this.window.exitOnClose()

    //停止脚本
    this.window.exit.click(() => {
      exit()
    })
    this.window.set.click(() => {
      var name = this.window.name.getText()
    })
  }
  watchName () {
      threads.start(() => {
        setInterval(() => {
            ui.run(() => {
              this.window.name.setText(new Date())
          })
      })
    })
  }
}
