import Category from '../models/Category'
import { save, update, remove, findAll } from './utils'

export default class CategoryController {
  static async add(ctx) {
    const { name, url } = ctx.request.body
    const category = new Category({
      name,
      url,
    })
    const res = await save(category)

    if (res.ok) {
      ctx.body = { ok: true, message: '添加分类成功' }
    } else {
      ctx.body = { ok: false, message: '添加分类失败' }
    }
  }

  static async update(ctx) {
    const { _id, name, url } = ctx.request.body
    const category = {
      _id,
      name,
      url,
    }
    const res = await update(Category, category)
    if (res.ok) {
      ctx.body = { ok: true, message: '更新分类成功' }
    } else {
      ctx.body = { ok: false, message: '更新分类失败' }
    }
  }

  static async remove(ctx) {
    const { _id } = ctx.request.query
    const res = await remove(Category, _id)

    if (res.ok) {
      ctx.body = { ok: true, message: '删除分类成功' }
    } else {
      ctx.body = { ok: false, message: '删除分类失败' }
    }
  }

  static async findAll(ctx) {
    ctx.body = await findAll(Category, 'categories')
  }
}
