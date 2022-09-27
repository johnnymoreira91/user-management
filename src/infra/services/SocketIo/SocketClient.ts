import { Websocket } from './Websocket'
import OrdersSocket from './OrderSocket'
import { httpServer } from '@infra/server'

class SocketIO {
  private socket = Websocket.getInstance(httpServer)

  constructor () {
    this.socket.initializeHandlers([
      { path: '/socket.io', handler: new OrdersSocket() }
    ])
    // this.socket.on('condiction')
  }

  listen () {
    this.socket.on('connection', (data) => {
      console.log(data.id, 'dataaaa')
      this.socket.on('disconnect', () => {
        console.log(`${data.id} disconnected`)
      })
    })
  }

  emit (channel: string, message: string) {
    // this.socket.on('connection', () => {
    //   this.socket.emit(channel, message)
    // })
    this.socket.emit(channel, message)
  }
}

export { SocketIO }
