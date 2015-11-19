'use strict';

var md5 = require('../common/md5');
var User = require('../models/user');
var home = require('./home');

module.exports = function(app, router) {
    router.get('/login', function *(next) {
        if (this.session.user) {
            return this.redirect('/');
        }

        yield this.render('user/login.html', {
            title: '登录'
        });
        yield next;
    });

    router.post('/login', function *(next) {
        let self = this;
        let body = this.request.body;
        let email = body.email;
        let password = body.password;

        let user = User.findByMail(email);

        yield user.then(function(user) {
            if (user.password === md5(password)) {
                user.password = null;
                delete user.password;
                self.session.user = user;

                return self.redirect('/');
            } else {
                return self.redirect('/login');
            }
        });

        yield next;
    });
};
