"use strict"

var path = require('path')
var send = require('koa-send')
var mount = require('koa-mount')

class UI extends Middleware {
  constructor(options) {
    super(options)

    this.defineMandatoryDependency('web_server', 'webServer')
  }

  *initialize() {
    var distDir = path.join(__filename, '../dist')
    var opts = {root: distDir}
    // var this.webServer.app.use()
    // var staticServe = require('koa-static')(distDir)
    var serve = require('koa-static')
    this.webServer.app.use(function*(next) {
      if (this.path === '/' || this.path.startsWith('/service')) {
        return yield send(this, 'index.html', opts)
      }
      if (this.path.startsWith('/assets') || this.path.startsWith('/font'))  {
        return yield send(this, this.path, opts)
      }
      yield next
    })
    // this.webServer.app.use(mount('/ui', serve(distDir)))
    // this.webServer.app.use(mount('/assets', serve(`${distDir}/assets`)))
    // this.webServer.app.use(mount('/fonts', serve(`${distDir}/fonts`)))
    // console.log(distDir)
  }
}

module.exports = UI
