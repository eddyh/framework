import {IncomingMessage, Server, ServerResponse} from "http"
import {Socket} from "net"

export class ClosableServer extends Server {
  closing = false
  private readonly sockets = new Map<Socket, number>()

  constructor() {
    super()

    this.on("connection", (socket: Socket) => {
      console.log("log 1")
      this.sockets.set(socket, 0)

      socket.on("close", () => {
        console.log("log 2")
        this.sockets.delete(socket)
      })
    })

    this.on("request", (request: IncomingMessage, response: ServerResponse) => {
      console.log("log 3")
      const socket = request.socket
      this.sockets.set(socket, +this.sockets.get(socket)! + 1)
      console.log("log 4")
      if (this.closing) {
        console.log("log 5")
        response.setHeader("Connection", "close")
      }
      console.log("log 6")
      response.on("finish", () => {
        console.log("log 7")
        const pending = +this.sockets.get(socket)! - 1
        this.sockets.set(socket, pending)

        if (this.closing && pending === 0) {
          console.log("log 8")
          socket.end()
        }
      })
    })
  }

  close(callback?: (err?: Error) => void): this {
    console.log("log 9")
    super.close(callback)

    this.closing = true

    process.nextTick(() => {
      console.log("log 10")
      for (const [socket, pending] of this.sockets) {
        if (pending === 0) {
          socket.end()
        }
      }
    })

    return this
  }
}

export default ClosableServer
