import User from '../models/User'

export default class UserController {
  static async signIn(ctx) {
    const { email, password } = ctx.request.body

    const res = await findOne(User, { email }, 'user')
    if (res.ok) {
      const user = res.user

      if (user.password === md5(password)) {
        ctx.body = { ok: true, message: '登录成功', user }
      } else {
        ctx.body = { ok: false, message: '密码错误' }
      }
    } else {
      ctx.body = { ok: false, message: '邮箱或密码错误' }
    }
  }
}
