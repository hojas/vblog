import mongoose from 'mongoose'

export const connectMongo = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/vblog')
    console.log('数据库连接成功')
  } catch (error) {
    console.log('数据库连接失败')
    console.log(error)
  }
}
