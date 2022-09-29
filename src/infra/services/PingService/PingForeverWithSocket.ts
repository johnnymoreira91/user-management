import { SocketIO } from '../SocketIo/SocketClient'
import https from 'https'

function PingForeverWithSocket (socket: SocketIO, channel: string, hostname: string) {
  setInterval(() => {
    let startRequest = new Date().getTime()
    const req = https.request({
      hostname: hostname
    }, function (res) {
      const pingTime = new Date().getTime() - startRequest
      // console.log(`${res.statusCode} | ${hostname} | ${pingTime} | ${new Date().toISOString().slice(0, 19).replace('T', ' ')}`)
      socket.emit(channel, JSON.stringify(pingTime))
    })
    req.on('error', (e) => {
      console.log('Erro: ' + e)
    })
    req.on('connect', (e) => {
      startRequest = new Date().getTime()
    })
    req.end()
  }, 3000)
}

export { PingForeverWithSocket }
