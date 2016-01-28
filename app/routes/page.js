'use strict';

var Post = require('../models/post');
var Category = require('../models/category');
var Tag = require('../models/tag');

module.exports = function(app, router) {
    router.get('/about', function *(next) {
        let self = this;

        yield this.render('page/about.html', {
            currentCat: 'about',
            user: self.session.user
        });

        yield next;
    });
    router.get('/sitemap.html', function *(next) {
        let self = this;
        let oPosts;
        let oTags;
        let pages = [{
            title: '关于',
            url: '/about',
        }];

        yield Post.findByCat().then(function(posts) {
            oPosts = posts;
            return Tag.findAll();
        }).then(function(tags) {
            oTags = tags;
            return Category.findAll();
        }).then(function(cats) {
            return self.render('page/sitemap.html', {
                ptitle: '网站地图',
                posts: oPosts,
                cats: cats,
                pages: pages,
                tags: oTags,
            });
        }).catch(function() {
            return next;
        });

        yield next;
    });
};

