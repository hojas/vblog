'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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
    create_time: { type: Date, default: Date.now },
});

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

PostSchema.virtual('pretty_create_time').get(function() {
    return moment(this.create_time).fromNow();
});
PostSchema.virtual('prettyCat').get(function() {
    return moment(this.create_time).fromNow();
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
                resolve(data);
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
            if (err) {
                reject(err);
            } else {
                resolve(post);
            }
        });
    });
});

module.exports = mongoose.model('Post', PostSchema);

