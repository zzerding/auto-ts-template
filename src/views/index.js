/**
 * 主界面
 */
import main from '@/module/main/index'
import config from '@/config'
import { saveUiValue, setUiValue, clear } from '@/store/ui'
import isTimeout from '@/components/isTimeout'
export default function MainView () {
  let title = config.name
  let color = '#354650'
  let readme = `
  1.软件说明
  `
  ui.statusBarColor('#000000')
  ui.layout(`
  <drawer id='drawer'>
  <vertical>
    <appbar>
      <toolbar id='toolbar' title='${title}' />
      <tabs id='tabs' />
    </appbar>
    <vertical padding='10' bg="#cccccc" w='*' h='*'>
      <horizontal>
        <Switch
          id='autoService'
          text='无障碍服务权限'
          checked='{{auto.service != null}}'
          padding='8 8 8 8'
          textSize='15sp'
        />
      </horizontal>
      <horizontal h='auto' align='center' marginTop='0'>
        <button id='start' w='*' text='启动' />
      </horizontal >
      <horizontal h='auto' align='center' marginTop='10'>
        <button id='showLog' w='*' text='打开日志' />
      </horizontal >
      <text id='log_title'  marginTop='10' gravity='center_horizontal'>
        使用说明
      </text>
      <text id='readme' textSize='10sp' w='*' marginTop='10'></text>
    </vertical>
  </vertical>
  <vertical layout_gravity='left' bg='#ffffff' w='280'>
    <img
      w='280'
      h='200'
      scaleType='fitXY'
      src='http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg'
    />
    <list id='menu'>
      <horizontal bg='?selectableItemBackground' w='*'>
        <img
          w='50'
          h='50'
          padding='16'
          src='{{this.icon}}'
          tint='${color}'
        />
        <text
          textColor='black'
          textSize='15sp'
          text='{{this.title}}'
          layout_gravity='center'
        />
      </horizontal>
    </list>
  </vertical>
</drawer>
    `)
  ui.readme.text(readme)
  // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
  ui.autoService.on('check', function (checked) {
    if (checked && auto.service == null) {
      app.startActivity({
        action: 'android.settings.ACCESSIBILITY_SETTINGS'
      })
    }
    if (!checked && auto.service != null) {
      auto.service.disableSelf()
    }
  })
  // 当用户回到本界面时，resume事件会被触发
  ui.emitter.on('resume', function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null
    // ui.float.checked = floaty.checkPermission()
  })
  activity.setSupportActionBar(ui.toolbar)
  //让工具栏左上角可以打开侧拉菜单
  ui.toolbar.setupWithDrawer(ui.drawer)
  ui.menu.setDataSource([
    {
      title: '退出',
      icon: '@drawable/ic_exit_to_app_black_48dp'
    }
  ])

  ui.menu.on('item_click', item => {
    switch (item.title) {
      case '退出':
        toastLog('脚本停止')
        threads.shutDownAll()
        exit()
        break
    }
  })
  //打开日志
  ui.showLog.click(function () {
    app.startActivity('console')
  })
  ui.start.click(function () {
    //在子线程中加载主逻辑
    saveUiValue([
      //保存ui控件内输入的文字
    ])
    threads.start(() => {
      main()
    })
  })
  //启动后自动设置ui控件数据
  //clear()
  setUiValue()
  //判断软件是否过期
  isTimeout()
}
