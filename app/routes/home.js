'use strict';

var Post = require('../models/post');

module.exports = function(app, router) {
    router.get('/', function *(next) {
        let self = this;
        let posts = Post.findByCat();

        yield posts.then(function(posts) {
            return self.render('home/index.html', {
                ptitle: 'home page',
                posts: posts,
                user: self.session.user
            });
        });

        yield next;
    });
};

