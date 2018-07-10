const mongoose = require('mongoose')
const User = require('./models/User')
const { md5 } = require('./api/utils')

exports.connectMongo = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI)
    console.log('数据库连接成功')
  } catch (err) {
    console.log('数据库连接失败')
    console.log(err)
  }
}

exports.initAdmin = async () => {
  const res = await User.findOne({ isAdmin: true })

  if (!res) {
    const user = new User({
      username: 'admin',
      email: 'admin@admin.com',
      password: md5('admin'),
      isAdmin: true,
    })

    try {
      await user.save()
      console.log('admin 创建成功')
    } catch (err) {
      console.log(err)
    }
  }
}
