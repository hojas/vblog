import '@babel/polyfill'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import json from 'koa-json'
import cors from '@koa/cors'
import { connectMongo } from './db'
import routers from './routers'

async function start() {
  await connectMongo()

  const app = new Koa()
  app.use(bodyParser())
  app.use(json())
  app.use(cors())

  const router = new Router()
  routers(router)

  app.listen(3000)
}

start()
