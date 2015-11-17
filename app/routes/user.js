'use strict';

var md5 = require('../common/md5');
var User = require('../models/user');

module.exports = function(app, router) {
    app.use(router.routes());

    router.get('/login', function *(next) {
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
        console.log(this.request, body);
        console.log(email, password);
        let user = User.findOne({ email: email }).exec(function(err, u) {
            console.log(u);
        });

        console.log(user);

        user.then(function(user) {
            if (user.password === md5(password)) {
                user.password = null;
                delete user.password;
                self.session.user = user;
                router.redirect('/');
            }
        });
    });
};

