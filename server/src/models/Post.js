const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  category: { type: Object, required: true },
  author: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', postSchema)
