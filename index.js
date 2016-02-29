"use strict"

var path = require('path')
var send = require('koa-send')
var mount = require('koa-mount')
var auth = require('koa-basic-auth')
var Bluebird = require('bluebird')
var exec = Bluebird.promisify(require('child_process').exec)

class UI extends Middleware {
  constructor(options) {
    super(options)

    this.defineMandatoryDependency('web_server', 'webServer')
    this.username = options.params.username
    this.password = options.params.password
  }

  *initialize() {
    var currentDir = path.join(__filename, '..')

    var distDir = path.join(currentDir, '/dist/release')
    var opts = {root: distDir}
    var serve = require('koa-static')
    var authenticate = auth({name: this.username, pass: this.password})

    this.webServer.app.use(function*(next) {
      try {
        yield next
      } catch (err) {
        if (err.status === 401) {
          this.status = 401
          this.set('WWW-Authenticate', 'Basic')
          this.body = "Authentication required"
        }
        else {
          throw err
        }
      }
    })
    this.webServer.app.use(authenticate, function*(next) {
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
