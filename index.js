"use strict"

var path = require('path')
var send = require('koa-send')
var mount = require('koa-mount')
var Bluebird = require('bluebird')
var exec = Bluebird.promisify(require('child_process').exec)

class UI extends Middleware {
  constructor(options) {
    super(options)

    this.defineMandatoryDependency('web_server', 'webServer')
  }

  *initialize() {
    var currentDir = path.join(__filename, '..')

    var distDir = path.join(currentDir, '/dist/release')
    var opts = {root: distDir}
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
  }
}

module.exports = UI
