'use strict';

var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var session = require('koa-session');
var staticServer = require('koa-static');
var router = require('koa-router')();
var mongoose = require('mongoose');

// routes
var home = require('./routes/home');
var user = require('./routes/user');

// local middlewares
var nunjucks = require('../middlewares/koa-nunjucks/index');

// create app
var app = koa();

// session
app.keys = ['some secret hurr'];
app.use(session(app));

// config static dir
app.use(staticServer(__dirname + '/public'));

app.use(bodyParser());

mongoose.connect('mongodb://localhost:27017/kblog');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

// nunjucks config
app.use(nunjucks('app/views', {
    noCache: process.env.NODE_ENV === 'production',
    watch: ! process.env.NODE_ENV === 'production'
}));

// run routes
home(app, router);
user(app, router);


app.listen(8080);

