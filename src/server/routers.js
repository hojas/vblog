const Router = require('koa-router')

const router = new Router()

router.get('/api/users', async ctx => {
  ctx.body = 'api users'
})

module.exports = router
