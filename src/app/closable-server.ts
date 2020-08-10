import {IncomingMessage, Server, ServerResponse} from "http"
import {Socket} from "net"
import Logger from "../util/logger"

export class ClosableServer extends Server {
  closing = false
  logg = new Logger()
  private readonly sockets = new Map<Socket, number>()

  constructor() {
    super()
    this.logg.warning("log 0")

    this.on("connection", (socket: Socket) => {
      this.logg.warning("log 1")
      this.sockets.set(socket, 0)

      socket.on("close", () => {
        this.logg.warning("log 2")
        this.sockets.delete(socket)
      })
    })

    this.on("request", (request: IncomingMessage, response: ServerResponse) => {
      this.logg.warning("log 3")
      const socket = request.socket
      this.sockets.set(socket, +this.sockets.get(socket)! + 1)
      this.logg.warning("log 4")
      if (this.closing) {
        this.logg.warning("log 5")
        response.setHeader("Connection", "close")
      }
      this.logg.warning("log 6")
      response.on("finish", () => {
        this.logg.warning("log 7")
        const pending = +this.sockets.get(socket)! - 1
        this.sockets.set(socket, pending)

        if (this.closing && pending === 0) {
          this.logg.warning("log 8")
          socket.end()
        }
      })
    })
  }

  close(callback?: (err?: Error) => void): this {
    this.logg.warning("log 9")
    super.close(callback)

    this.closing = true

    process.nextTick(() => {
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
