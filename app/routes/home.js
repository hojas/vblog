'use strict';

var Post = require('../models/post');

module.exports = function(app, router) {
    router.get('/', function *(next) {
        let self = this;

        // TODO
        // 分页功能
        yield Post.findByCat().then(function(posts) {
            return self.render('home/index.html', {
                posts: posts,
                user: self.session.user
            });
        });

        yield next;
    });
};

