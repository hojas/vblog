var koa = require('koa');
var app = koa();

app.use(function *() {
    this.body = 'hello';
});

app.listen(8080);

