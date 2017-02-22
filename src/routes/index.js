import koaRouter from 'koa-router';

import { Post } from '../models';
import initAPI from '../api';
import user from './user';
import post from './post';

export default function routes(app) {
    const router = koaRouter();

    app.use(router.routes())
        .use(router.allowedMethods());


    router.get('/', async (ctx, next) => {
        let res = await Post.findByCate();
        let { user } = ctx.session;
        return ctx.render('home', { ...res, user, current_cate: 'index' });
    });
    router.get('/page/:page', async (ctx, next) => {
        let page = ctx.params.page;
        let res = await Post.findByCate(null, page);
        let  { user } = ctx.session;

        if (res.status === 'error' || res.page > res.pages) {
            ctx.status = 404;
            return ctx.render('errors/notFound', { user });
        }

        return ctx.render('home', {
            ...res,
            user,
            current_cate: 'index'
        });
    });

    initAPI(router);
    user(router);
    post(router);

    router.get('*', async (ctx, next) => {
        ctx.status = 404;
        return ctx.render('errors/notFound', {});
    });
}

