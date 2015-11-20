'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var CategorySchema = new Schema({
    url: String,
    name: String,
    index: Number,
});

CategorySchema.static('findByUrl', function(url) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({ url: url }, function(err, cat) {
            if (err || !cat) {
                reject(err || '此分类不存在');
            } else {
                resolve(cat);
            }
        });
    });
});

module.exports = mongoose.model('Category', CategorySchema);

