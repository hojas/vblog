import koaRouter from 'koa-router';

import { Post } from '../models';
import user from './user';
import post from './post';

export default function routes(app) {
    const router = koaRouter();

    app.use(router.routes())
        .use(router.allowedMethods());


    router.get('/', async (ctx, next) => {
        let res = await Post.findByCate();
        let user = ctx.session.user;
        await ctx.render('home', { user, ...res, current_cate: 'index' });
    });

    user(router);
    post(router);

    router.get('*', async (ctx, next) => {
        ctx.status = 404;
        await ctx.render('errors/notFound', {});
    });
}

