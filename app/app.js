var koa = require('koa');
var mongoose = require('mongoose');
var app = koa();

mongoose.connect('mongodb://localhost:27017/kblog');
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

app.use(function *() {
    this.body = 'hello';
});

app.listen(8080);

