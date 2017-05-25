import mongoose from 'mongoose';
import { Post } from './post';

const commentSchema = new mongoose.Schema({
    author: Object, // { username, email, site }
    content: String,
    postUrl: String,
    createdAt: { type: Date, default: Date.now },
});

commentSchema.statics.add = async function(comment) {
    await comment.save();

    return {
        status: 'success',
        msg: '评论成功',
        comment,
    };
};

commentSchema.statics.findByPost = async function(postUrl) {
    let comments = await this.find({ postUrl }).sort({ createdAt: -1 });

    return {
        status: 'success',
        comments,
    };
};

let Comment = mongoose.model('Comment', commentSchema);

export { Comment };

