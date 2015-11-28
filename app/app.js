'use strict';

var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var staticServer = require('koa-static');
var mongoose = require('mongoose');
var routes = require('./routes/routers');

// local middlewares
var nunjucks = require('../middlewares/koa-nunjucks/index');

// create app
var app = koa();

mongoose.connect('mongodb://localhost:27017/kblog');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

// config static dir
app.use(staticServer(__dirname + '/public'));

// nunjucks config
app.use(nunjucks('app/views', {
    noCache: process.env.NODE_ENV === 'production',
    watch: ! process.env.NODE_ENV === 'production'
}));

// session
app.keys = ['some secret hurr'];
app.use(session(app));
// body parser
app.use(bodyParser());
// routes
routes(app);

// catch 404
app.use(function *(next) {
    if (this.status === 404) {
        this.body = '此页面不存在';
    }
    yield next;
});

app.listen(80);

