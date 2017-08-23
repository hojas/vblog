import 'babel-polyfill'
import { resolve } from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import serve from 'koa-static'
import mongoose from 'mongoose'

import routes from './routes'

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'))

const app = new Koa()

app.use(bodyParser())

app.keys = ['davinci']
app.use(session({
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}, app))
app.use(serve(resolve(__dirname, '../static')))

routes(app)

app.listen(8080, () => console.log('Server is running on 8080'))

