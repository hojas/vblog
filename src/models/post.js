import mongoose from 'mongoose';
import { Category } from './category';
import { Tag } from './tag';

const postSchema = new mongoose.Schema({
    url: String,
    title: String,
    content: String,
    author: String,
    category: String,
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

postSchema.statics.findByCate = async function(cateUrl) {
    let cate = { category: cateUrl };

    if (cateUrl) {
        let res = await Category.findByUrl(cateUrl);

        if (res.status === 'error') {
            return res;
        }
    } else {
        cate = {};
    }

    let posts = await this.find(cate).sort({ createdAt: -1 });

    return { posts };
};

postSchema.statics.findByTag = async function(tag) {
    if (tag) {
        let res = await Tag.findByName(tag);
        if (res.status === 'error') {
            return res;
        }
    }

    let posts = await this.find({ tags: { $in: [tag] } }).sort({ createdAt: -1 });
    return { posts };
};

postSchema.statics.findByUrl = async function(url) {
    let post = await this.findOne({ url });

    if (post) {
        post.views++;
        post.save();
        return { post };
    }
    return { status: 'error', msg: '没有找到相关文章' };
};

postSchema.statics.add = async function(post) {
    let p = new Post(post);
    let posts = await this.find({});
    p.url = posts.length + 1 + '';

    await p.save();
    return {
        status: 'success',
        msg: '文章发布成功',
        post: p,
    };
};

postSchema.statics.edit = async function(postUrl, post) {
    await Post.update({ url: postUrl }, { $set: { ...post } });

    return {
        status: 'success',
        msg: '文章更新成功',
        post,
    };
};

let Post = mongoose.model('Post', postSchema);

export { Post }

