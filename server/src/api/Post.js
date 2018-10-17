import Post from '../models/Post'
import Category from '../models/Category'
import { save, update, remove, findById, findAll } from './utils'

const mapCates = async () => {
  const cates = await Category.find({})
  const catesObj = {}
  cates.map(cate => {
    catesObj[cate.url] = cate
  })
  return catesObj
}

export default class PostController {
  static async add(ctx) {
    const cates = await mapCates()
    const { title, content, category } = ctx.request.body
    const post = new Post({
      title,
      content,
      category: cates[category],
      author: ctx.session.user,
    })

    const res = await save(post)
    if (res.ok) {
      ctx.body = { ok: true, message: '添加文章成功' }
    } else {
      ctx.body = { ok: false, message: '添加文章失败' }
    }
  }

  static async update(ctx) {
    const cates = await mapCates()
    const { _id, title, content, category } = ctx.request.body
    const post = {
      _id,
      title,
      content,
      category:
        typeof category === 'object' ? cates[category.url] : cates[category],
    }

    const res = await update(Post, post)
    if (res.ok) {
      ctx.body = { ok: true, message: '更新文章成功' }
    } else {
      ctx.body = { ok: false, message: '更新文章失败' }
    }
  }

  static async updateContent(ctx) {
    const { _id, content } = ctx.request.body
    const post = {
      _id,
      content,
    }

    const res = await update(Post, post)
    if (res.ok) {
      ctx.body = { ok: true, message: '更新文章成功' }
    } else {
      ctx.body = { ok: true, message: '更新文章失败' }
    }
  }

  static async remove(ctx) {
    const { _id } = ctx.request.query
    const res = await remove(Post, _id)
    if (res.ok) {
      ctx.body = { ok: true, message: '删除文章成功' }
    } else {
      ctx.body = { ok: false, message: '删除文章失败' }
    }
  }

  static async findById(ctx) {
    const id = ctx.params.id
    const res = await findById(Post, id, 'post')
    if (res.ok) {
      ctx.body = { ok: true, post: res.post }
    } else {
      ctx.body = { ok: false, message: '文章不存在' }
    }
  }

  static async findAll(ctx) {
    const cate_url = ctx.request.query.category
    const cates = await mapCates()
    let category = null
    if (cate_url) {
      category = cates[cate_url]
    }
    const query = category ? { category } : category
    ctx.body = await findAll(Post, 'posts', query)
  }
}
