import zlib from 'zlib';
import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import compress from 'koa-compress';
import staticServer from 'koa-static';
import mongoose from 'mongoose';
import routes from './routes';

// local middlewares
import nunjucks from './middlewares/nunjucks';

// create app
const app = koa();

mongoose.Promise = global.Promise;
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
    let self = this;

    if (this.status === 404) {
        return self.render('page/404.html', {
            user: self.session.user,
        });
    }

    yield next;
});

app.use(compress({
    filter: ct => /text/i.test(ct),
    threshold: 2048,
    flush: zlib.L_SYNC_FLUSH
}));

// for test
// app.listen(8080);

// for production
app.listen(8080, '127.0.0.1');

