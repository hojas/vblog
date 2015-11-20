'use strict';

var Category = require('../models/category');
var Post = require('../models/post');

module.exports = function(app, router) {
    router.get('/:cat', function *(next) {
        let self = this;
        let catUrl = this.params.cat;
        let category = Category.findByUrl(catUrl);

        yield category.then(function(cat) {
            let posts = Post.findByCat(cat);
            return posts.then(function(posts) {
                return self.render('post/index.html', {
                    ptitle: cat.name,
                    currentCat: catUrl,
                    posts: posts,
                    user: self.session.user
                });
            }, function() {
                return next;
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.get('/:id'+'.html', function *(next) {
        let self = this;
        let id = this.params.id;
        let post = Post.findById(id);

        yield post.then(function(post) {
            return self.render('post/details.html', {
                ptitle: post.title,
                post: post,
                user: self.session.user
            });
        });
    });
};

