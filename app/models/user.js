'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('../common/md5');

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

UserSchema.methods.add = function() {
    let self = this;
    this.password = md5(this.password);

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

UserSchema.static('findByMail', function(email) {
    let self = this;

    return new Promise(function(resolve, reject) {
        self.findOne({ email: email }, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        });
    });
});

module.exports = mongoose.model('User', UserSchema);

