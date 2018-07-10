const User = require('../models/User')
const { md5, isAdmin, save, findOne, findAll } = require('./utils')

module.exports = class UserController {
  static async signIn(ctx) {
    const { email, password } = ctx.request.body

    const res = await findOne(User, { email }, 'user')
    if (res.ok) {
      const user = res.user
      if (user.password === md5(password)) {
        delete user.password
        ctx.session.user = user
        ctx.body = { ok: true, message: '登录成功', user }
      } else {
        ctx.body = { ok: false, message: '密码错误' }
      }
    } else {
      ctx.body = { ok: false, message: '邮箱或密码错误' }
    }
  }

  static async signUp(ctx) {
    const { username, email, password, rePassword } = ctx.request.body

    if (password !== rePassword) {
      ctx.body = { ok: false, message: '两次密码不相同' }
    }

    const query = { $or: [{ username }, { email }] }
    const res = await findOne(User, query, 'user')

    if (res.ok) {
      ctx.body = { ok: false, message: '用户名或邮箱已注册' }
    } else {
      const user = new User({
        username,
        email,
        password: md5(password),
      })

      const res = await save(user)
      if (res.ok) {
        delete user.password
        ctx.session.user = user
        ctx.body = { ok: true, message: '注册成功', user }
      } else {
        ctx.body = { ok: false, message: '注册失败' }
      }
    }
  }

  static async logout(ctx) {
    delete ctx.session.user
    ctx.body = { ok: true, message: '退出成功' }
  }

  static getCurrentUser(ctx) {
    const user = ctx.session.user

    if (user && user.email) {
      ctx.body = { ok: true, user }
    } else {
      ctx.body = { ok: false }
    }
  }

  static async findAll(ctx, next) {
    if (isAdmin(ctx)) {
      ctx.body = await findAll(User, 'users')
    } else {
      await next()
    }
  }
}
