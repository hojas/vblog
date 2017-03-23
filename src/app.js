import 'babel-polyfill';
import path from 'path';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';
import send from 'koa-send';
import koaSlash from 'koa-slash';
import mongoose from 'mongoose';
import views from 'koa-nunjucks-next';

import routes from './routes';
import filters from './utils/filters';

const app = new Koa();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'));

app.use(koaSlash());
app.use(bodyParser());
app.keys = ['davinci'];
app.use(convert(session(app)));
app.use(views('../views', { filters }));
app.use(async (ctx, next) => {
    await send(ctx, ctx.path, { root: path.resolve(__dirname, '../static') })

    if (ctx.status === 404) {
        await next();
    }
});

routes(app);

app.listen(8080, () => {
//    console.log('Server is running on 8080');
});

