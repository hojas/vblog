'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var CategorySchema = new Schema({
    name: String, // 名称
    url: String, // url
    index: Number, // 排序指数
    total: { type: Number, default: 0 }, // 文章总数
    create_time: { type: Date, default: Date.now } // 创建时间
});

CategorySchema.static('findByUrl', function(url) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({ url: url }, function(err, cat) {
            if (err) {
                reject(err);
            } else {
                resolve(cat);
            }
        });
    });
});

module.exports = mongoose.model('Category', CategorySchema);

