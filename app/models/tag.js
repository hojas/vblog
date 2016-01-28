'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema =  new Schema({
    name: String,
});

TagSchema.methods.add = function() {
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

TagSchema.static('isExisted', function(name) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({ name: name }, function(err, tag) {
            if (err) {
                reject(err);
            } else {
                resolve(tag);
            }
        });
    });
});
TagSchema.static('findAll', function() {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.find({}, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
});

module.exports = mongoose.model('Tag', TagSchema);

