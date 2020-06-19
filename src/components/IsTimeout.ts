import config from '@/config'
import store from '@/store'
export default function isTimeout () {
  threads.start(()=>{
    let timeOut = config.timeOut
    let url = 'http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp'
    let result = http.get(url)
    let isOut: boolean = true
    if (result.statusCode == 200) {
      try {
        let timeNow = result.body.json().data.t
        let dataOut = new java.text.SimpleDateFormat('yyyy-MM-dd')
          .parse(timeOut, new java.text.ParsePosition(0))
          .getTime()
        isOut = dataOut * 1 < timeNow * 1
      } catch (error) {
        toastLog('未网连接失败')
      }
    }
    store.isTimeout = isOut
  })
}
