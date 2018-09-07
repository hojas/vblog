import Koa from 'koa'
import bodyParser from 'koa-router'
import Router from 'koa-router'
import json from 'koa-json'
import { connectMongo } from './db'
import routers from './routes'

async function start() {
  await connectMongo()

  const app = new Koa()
  app.use(bodyParser())
  app.use(json())

  const router = new Router()
  routers(router)

  app.listen(3000)
}

start()
