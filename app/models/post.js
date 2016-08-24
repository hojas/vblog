import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js';
import Category from './category';

const Schema = mongoose.Schema;
const pageSize = 15;

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

PostSchema.plugin(mongoosePaginate);

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

PostSchema.static('findByCate', function(cate, page = 1) {
    let current_cate = cate ? { category: { name: cate.name, url: cate.url }} : {};

    return new Promise((resolve, reject) => {
        let pSize = 0;
        if (page === 0) {
            page = 1;
            pSize = 1000;
        }

        this.paginate(current_cate, {
            page: page,
            limit: pSize || pageSize,
            sort: { createdAt: -1 },
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
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
PostSchema.static('findByTag', function(tag, page = 1) {
    return new Promise((resolve, reject) => {
        this.paginate({ tags: { $in: [tag] } }, {
            page: page,
            limit: pageSize,
            sort: { createAt: -1 },
        })
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
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

