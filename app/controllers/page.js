'use strict';

const Post = require('../models/post');
const Category = require('../models/category');
const Tag = require('../models/tag');

exports.about = function *(next) {
    let self = this;

    yield this.render('page/about.html', {
        ptitle: '关于',
        currentCat: 'about',
        user: self.session.user,
    });

    yield next;
};
exports.sitemap = function *(next) {
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
};

