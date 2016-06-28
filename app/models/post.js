import mongoose from 'mongoose';
import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js';
import Category from './category';

const Schema = mongoose.Schema;

var PostSchema = new Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
    category: { name: String, url: String },
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

PostSchema.virtual('pretty_createdAt').get(function() {
    moment.locale('zh-cn');
    return moment(this.createdAt).format('ll');
});
PostSchema.virtual('markedContent').get(function() {
    return marked(this.content);
});

PostSchema.methods.increaseViews = function() {
    let query = { _id: this._id };
    let update = { $set: { views: this.views + 1 } };

    return new Promise((resolve, reject) => {
        this.constructor.update(query, update, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};
PostSchema.methods.add = function() {
    return new Promise((resolve, reject) => {
        this.save((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
PostSchema.methods.update = function(post) {
    let q = { _id: this._id };

    return new Promise((resolve, reject) => {
        this.constructor.update(q, post, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
};

PostSchema.static('findByCat', function(cat) {
    let current_cat = cat ? { category: { name: cat.name, url: cat.url }} : {};

    return new Promise((resolve, reject) => {
        this.find(current_cat)
        .sort({ createdAt: -1 })
        .exec((err, posts) => {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
});
PostSchema.static('findById', function(id) {
    return new Promise((resolve, reject) => {
        this.findOne({ id: id }, (err, post) => {
            if (err || !post) {
                reject(err);
            } else {
                resolve(post);
            }
        });
    });
});
PostSchema.static('findByTag', function(tag) {
    return new Promise((resolve, reject) => {
        this.find({ tags: { $in: [tag] } }, (err, posts) => {
            if (err || !posts.length) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
});
PostSchema.static('postCounts', function() {
    return new Promise((resolve, reject) => {
        this.count({}, (err, count) => {
            if (err) {
                reject(err);
            } else {
                resolve(count);
            }
        });
    });
});

export default mongoose.model('Post', PostSchema);

