import {inspect} from "util"

import "./util/polyfill"

import Router from "./router"
import AbstractTask from "./util/abstract-task"
import Logger from "./util/logger"

import ClosableServer from "./app/closable-server"
import dispatch from "./decorate/dispatch"

import {log, rescue, route, shutdown, Stack, write} from "./middleware"

export interface ApplicationOptions {
  port?: number,
  logger?: Logger,
  router?: Router,
  terminationGrace?: number,
  before?(app: Application): void,
}

export class Application extends AbstractTask {
  /* Start a new application with the given options in next tick. */
  static start(options: ApplicationOptions = {}) {
    const app = new this(options)
    process.nextTick(() => {
      app.start().catch(err => {throw err})
    })
    return app
  }

  port: number
  router: Router
  stack: Stack

  server: ClosableServer = new ClosableServer()

  constructor(options: ApplicationOptions = {}) {
    super()

    const {
      port = 3000,
      router = new Router,
      logger = new Logger,
      terminationGrace = 25,
      before = () => {},
    } = options

    this.port = port
    this.router = router
    this.logger = logger

    /* Bare minimum stack to do anything useful. */
    this.stack = [
      log(logger),
      write(),
      rescue(),
      shutdown(terminationGrace),
      route(router),
    ]

    Object.freeze(this)
    before(this)
  }

  async start(): Promise<void> {
    await super.start()

    this.server.timeout = 0

    // ES7: this.server.on("request", ::this.dispatch)
    this.server.on("request", dispatch(this.stack))

    this.server.listen(this.port)

    return new Promise(resolve => {
      this.server.once("listening", resolve)
    })
  }

  async stop(): Promise<void> {
    await super.stop()

    this.server.close()

    return new Promise(resolve => {
      this.server.once("close", resolve)
    })
  }

  async kill(): Promise<void> {
    await super.kill()

    /* Don't wait for server to quite gracefully, but quit after short delay.
       This avoids processes hanging for a long time because a
       request failed to finish. We sacrifice all running requests for a
       more speedy recovery because the server will restart. */
    this.server.close()
    this.server.unref()

    return new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }

  [inspect.custom]() {
    return {
      router: this.router,
      server: "<node server>",
      stack: this.stack,
    }
  }
}

export default Application
