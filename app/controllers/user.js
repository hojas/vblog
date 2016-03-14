'use strict';

const md5 = require('../common/md5');
const User = require('../models/user');

exports.login = function *(next) {
    if (this.session.user) {
        return this.redirect('/');
    }

    yield this.render('user/login.html', {
        ptitle: '登录'
    });

    yield next;
};
exports.loginPost = function *(next) {
    let self = this;
    let body = this.request.body;
    let email = body.email;
    let password = body.password;

    yield User.findByMail(email).then(function(user) {
        if (user.password === md5(password)) {
            user.password = null;
            delete user.password;
            self.session.user = user;

            return self.redirect('/');
        } else {
            return self.redirect('/login');
        }
    }, function() {
        return next;
    });

    yield next;
}

