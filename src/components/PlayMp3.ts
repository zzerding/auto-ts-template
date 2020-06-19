export default function palyMp3 (path:string) {
    threads.start(function () {
      let musicPath = files.cwd() + path
      log(musicPath)
      media.playMusic(musicPath)
      sleep(media.getMusicDuration())
    })
  }