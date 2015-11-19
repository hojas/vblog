'use strict';

var Category = require('../models/category');
var Post = require('../models/post');

module.exports = function(app, router) {
    router.get('/:cat', function *(next) {
        let self = this;
        let cat = this.params.cat;
        let category = Category.findByUrl(cat);

        yield category.then(function(cat) {
            let posts = Post.findByCat(cat);
            return posts.then(function(posts) {
                return self.render('home/index.html', {
                    ptitle: 'home page',
                    posts: posts,
                    user: self.session.user
                });
            });
        })
        yield next;
    });
};

