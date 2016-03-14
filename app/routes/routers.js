'use strict';

const router = require('koa-router')();
const home = require('../controllers/home');
const page = require('../controllers/page');
const post = require('../controllers/post');
const user = require('../controllers/user');

module.exports = function(app) {
    app.use(router.routes());

    router.get('/', home);

    router.get('/about', page.about);
    router.get('/sitemap.html', page.sitemap);

    router.get('/:cat', post.category);
    router.get('/:id'+'.html', post.article);
    router.get('/tag/:tag', post.tag);
    router.get('/new', post.new);
    router.post('/new', post.newPost);
    router.get('/:id/edit', post.editArticle);
    router.post('/:id/edit', post.editArticlePost);

    router.get('/login', user.login);
    router.post('/login', user.loginPost);
};

