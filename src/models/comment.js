import mongoose from 'mongoose';
import { Post } from './post';

const commentSchema = new mongoose.Schema({
    author: Object, // { username, email }
    content: String,
    createdAt: { type: Date, default: Date.now },
});

commentSchema.statics.add = async function(comment) {
    let newComment = new Comment(comment);
    await newComment.save();

    return {
        status: 'success',
        msg: '评论成功',
        newComment,
    };
}

let Comment = mongoose.model('Comment', commentSchema);

export { Comment };

