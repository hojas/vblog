'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');
var marked = require('marked');
var Category = require('./category');

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
    let self = this;
    let query = { _id: this._id };
    let update = { $set: { views: this.views + 1 } };

    return new Promise(function(resolve, reject) {
        self.constructor.update(query, update, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(self);
            }
        });
    });
};
PostSchema.methods.add = function() {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.save(function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};
PostSchema.methods.update = function(post) {
    let self = this;
    let q = { _id: this._id };

    return new Promise(function(resolve, reject) {
        self.constructor.update(q, post, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(self);
            }
        });
    });
};

PostSchema.static('findByCat', function(cat) {
    let self = this;
    let current_cat = cat ? { category: { name: cat.name, url: cat.url }} : {};

    return new Promise(function(resolve, reject) {
        self.find(current_cat)
        .sort({ createdAt: -1 })
        .exec(function(err, posts) {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
});
PostSchema.static('findById', function(id) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({ id: id }, function(err, post) {
            if (err || !post) {
                reject(err);
            } else {
                resolve(post);
            }
        });
    });
});
PostSchema.static('findByTag', function(tag) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.find({ tags: { $in: [tag] } }, function(err, posts) {
            if (err || !posts.length) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
});
PostSchema.static('postCounts', function() {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.count({}, function(err, count) {
            if (err) {
                reject(err);
            } else {
                resolve(count);
            }
        });
    });
});

module.exports = mongoose.model('Post', PostSchema);

