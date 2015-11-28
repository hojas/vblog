'use strict';

var router = require('koa-router')();

module.exports = function(app) {
    app.use(router.routes());

    // 载入所有 router
    require('./home')(app, router);
    require('./user')(app, router);
    require('./post')(app, router);
};

