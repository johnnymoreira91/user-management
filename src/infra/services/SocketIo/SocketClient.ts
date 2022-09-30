import { Websocket } from './Websocket'
import OrdersSocket from './OrderSocket'
import { httpServer } from '@infra/server'

class SocketIO {
  private socket = Websocket.getInstance(httpServer)

  constructor () {
    this.socket.initializeHandlers([
      { path: '/socket.io', handler: new OrdersSocket() }
    ])
  }

  listen () {
    console.log('listennn')
    this.socket.on('connection', (data) => {
      console.log(data.id, 'dataaaa')
      data.on('teste', (data2) => {
        console.log(data2)
      })
      this.socket.on('disconnect', () => {
        console.log(`${data.id} disconnected`)
      })
    })
  }

  emit (channel: string, message: string) {
    this.socket.emit(channel, message)
  }
}

export { SocketIO }
