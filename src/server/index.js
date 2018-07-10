const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const json = require('koa-json')
const logger = require('koa-logger')
const { Nuxt, Builder } = require('nuxt')

async function start () {
  //
  // create app
  //
  const app = new Koa()
  const host = process.env.HOST || '0.0.0.0'
  const port = process.env.PORT || 8080

  //
  // setup koa middlewares
  //
  app.keys = ['huppyrblog']
  const sessionConfig = {
    key: 'rblog:sss',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  }
  app.use(bodyParser())
  app.use(session(sessionConfig, app))
  app.use(json())
  app.use(logger())

  //
  // setup database
  //
  const { connectMongo, initAdmin } = require('./db')
  await connectMongo()
  //initAdmin()

  //
  // setup api
  //
  const api = require('./routers')
  app.use(api.routes())
    .use(api.allowedMethods())

  //
  // setup nuxt
  //
  const config = require('../../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')

  const nuxt = new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async ctx => {
    ctx.status = 200

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      ctx.req.session = ctx.session
      ctx.req.state = ctx.state

      nuxt.render(ctx.req, ctx.res, promise => {
        promise.then(resolve).catch(reject)
      })
    })
  })

  //
  // start app
  //
  app.listen(port, host, () =>
    console.log('Server is listening on ' + host + ':' + port))
}

start()
