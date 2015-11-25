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
            return post.increaseViews().then(function(post) {
                return self.render('post/details.html', {
                    ptitle: post.title,
                    post: post,
                    user: self.session.user
                });
            }, function() {
                return next
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.get('/tag/:tag', function *(next) {
        let self = this;
        let tag = this.params.tag;
        let posts = Post.findByTag(tag);

        yield posts.then(function(posts) {
            return self.render('post/tag.html', {
                ptitle: tag,
                tag: tag,
                posts: posts,
                user: self.session.user,
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.get('/new', function *(next) {
        if (! this.session.user) {
            return next;
        }

        let self = this;
        let cats = Category.findAll();

        yield cats.then(function(cats) {
            return self.render('post/new.html', {
                ptitle: '写文章',
                cats: cats,
                user: self.session.user,
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.post('/new', function *(next) {
        if (! this.session.user) {
            return next;
        }

        let self = this;
        let body = this.request.body;
        let title = body.title;
        let content = body.content;
        let tags = body.tags.split(/\s*,\s*/);
        let category = body.category.split(',');

        category = { name: category[0], url: category[1] }

        let count = Post.postCounts();

        yield count.then(function(count) {
            let post = new Post({
                id: count + 1,
                title: title,
                content: content,
                author: self.session.user.username,
                category: category,
                tags: tags,
            });

            return post.add().then(function(post) {
                return self.body = { next: '/' + post.id + '.html' };
            }, function() {
                return next;
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.get('/:id/edit', function *(next) {
        if (! this.session.user) {
            return next;
        }

        let self = this;
        let id = this.params.id;
        let post = Post.findById(id);
        let cats = Category.findAll();

        yield post.then(function(post) {
            return cats.then(function(cats) {
                return self.render('post/new.html', {
                    ptitle: post.title,
                    cats: cats,
                    post: post,
                    user: self.session.user,
                });
            }, function() {
                return next;
            });
        }, function() {
            return next;
        });

        yield next;
    });

    router.post('/:id/edit', function *(next) {
        if (! this.session.user) {
            return next;
        }

        let self = this;
        let id = this.params.id;
        let post = Post.findById(id);
        let update = this.request.body.post;
        let category = update.category.split(',');

        update.category = { name: category[0], url: category[1] }

        yield post.then(function(post) {
            return post.update(update).then(function(post) {
                return self.body = { next: '/' + post.id + '.html' };
            }, function() {
                return next;
            });
        }, function() {
            return next;
        });

        return next;
    });
};

