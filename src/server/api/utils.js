const crypto = require('crypto')

exports.md5 = str =>
  crypto
    .createHash('md5')
    .update(str)
    .digest('hex')

exports.isUser = ctx => {
  const user = ctx.session.user
  if (user && user.email) {
    return true
  }
  return false
}

exports.isAdmin = ctx => {
  const user = ctx.session.user
  if (user && user.isAdmin) {
    return true
  }
  return false
}

exports.save = async doc => {
  try {
    await doc.save()
    return { ok: true }
  } catch (err) {
    return { ok: false }
  }
}

exports.update = async (model, doc) => {
  try {
    await model.findByIdAndUpdate(doc._id, { ...doc })
    return { ok: true }
  } catch (err) {
    return { ok: false }
  }
}

exports.remove = async (model, id) => {
  try {
    await model.findByIdAndRemove(id)
    return { ok: true }
  } catch (err) {
    return { ok: false }
  }
}

exports.findAll = async (model, name, query = {}) => {
  try {
    const res = await model.find(query)
    if (res) {
      return { ok: true, [name]: res }
    }
    return { ok: false }
  } catch (err) {
    return { ok: false }
  }
}

const findOne = async (model, query, name) => {
  try {
    const res = await model.findOne(query)
    if (res) {
      return { ok: true, [name]: res }
    }
    return { ok: false }
  } catch (err) {
    return { ok: false }
  }
}

exports.findOne = findOne
exports.findById = async (model, id, name) => findOne(model, { _id: id }, name)
