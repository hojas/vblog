import mongoose from 'mongoose'
import md5 from '../utils/md5'

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
})

userSchema.statics.add = async function(ctx, user) {
    let document = await this.findOne({ email: user.email })
    if (document) {
        return { ok: false, msg: '此邮箱已注册' }
    }

    user.password = md5(user.password)
    let u = await user.save()
    user.password = null
    ctx.session.user = user

    return { ok: true, msg: '注册成功', user }
}

userSchema.statics.login = async function(ctx, email, password) {
    let user = await this.findOne({ email })

    if (user) {
        if (md5(password) === user.password) {
            user.password = null
            ctx.session.user = user
            return { ok: true, msg: '登录成功', user }
        }
        return { ok: false, msg: '密码错误', user }
    }

    return { ok: false, msg: '邮箱未注册', user }
}

let User = mongoose.model('User', userSchema)

export { User }
