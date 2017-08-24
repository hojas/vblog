import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import { Category } from "./category";
import { Tag } from "./tag";

const postSchema = new mongoose.Schema({
  url: String,
  title: String,
  content: String,
  author: String,
  category: String,
  tags: { type: Array, default: [] },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

postSchema.plugin(mongoosePaginate);

postSchema.statics.findByCate = async function(cateUrl, page = 1) {
  let cate = { category: cateUrl };

  if (cateUrl) {
    let res = await Category.findByUrl(cateUrl);
    if (!res.ok) {
      return res;
    }
  } else {
    cate = {};
  }

  if (page < 1) {
    return { ok: true, posts: [] };
  }

  let posts = await this.paginate(cate, {
    page,
    limit: 15,
    sort: { createdAt: -1 }
  });
  return { ok: true, posts };
};

postSchema.statics.findByTag = async function(tag, page = 1) {
  if (tag) {
    let res = await Tag.findByName(tag);
    if (res.status === "error") {
      return res;
    }
  }

  if (page < 1) {
    return { status: "error" };
  }

  return this.paginate(
    { tags: { $in: [tag] } },
    {
      page,
      limit: 15,
      sort: { cratedAt: -1 }
    }
  );
};

postSchema.statics.findByUrl = async function(url) {
  let post = await this.findOne({ url });

  if (post) {
    post.views++;
    post.save();
    return { ok: true, post };
  }
  return { ok: false, msg: "没有找到相关文章" };
};

postSchema.statics.add = async function(post) {
  let posts = await this.find({});
  post.url = posts.length + 1 + "";

  await post.save();
  return {
    ok: true,
    msg: "文章发布成功",
    post
  };
};

postSchema.statics.edit = async function(post) {
  await this.update({ url: post.url }, { $set: { ...post } });

  return {
    status: "success",
    msg: "文章更新成功",
    post
  };
};

let Post = mongoose.model("Post", postSchema);

export { Post };
