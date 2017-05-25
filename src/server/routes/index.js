import koaRouter from 'koa-router';

import initAPI from '../api';

export default function routes(app) {
    const router = koaRouter();

    app.use(router.routes())
        .use(router.allowedMethods());

    initAPI(router);

    router.get('*', async (ctx, next) => {
        return ctx.render('index');
    });
}

