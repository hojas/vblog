'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    url: String,
    title: String,
    content: String,
    author: String,
    category: String,
    tags: { type: Array, default: [] },
    views: { type: Number, default: 0 },
    create_time: { type: Date, default: Date.now }
});


PostSchema.virtual('pretty_create_time').get(function() {
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
    let current_cat = cat ? { category: cat.name } : {};

    return new Promise(function(resolve, reject) {
        self.find(current_cat, function(err, posts) {
            if (err) {
                reject(err);
            } else {
                resolve(posts);
            }
        });
    });
});

module.exports = mongoose.model('Post', PostSchema);

