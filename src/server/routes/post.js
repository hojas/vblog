import pangu from 'pangu';
import { Post } from '../models';

export default function postRoutes(router) {
    router.get('/:cate', async (ctx, next) => {
        let cate = ctx.params.cate;
        let res = await Post.findByCate(cate);
        let user = ctx.session.user;

        if (res.status === 'error') {
            return next();
        } else {
            return ctx.render('post/posts', { ...res, user, current_cate: cate });
        }
    });
    router.get('/:cate/page/:page', async (ctx, next) => {
        let { cate, page } = ctx.params;
        let { user } = ctx.session;
        let res = await Post.findByCate(cate, page);

        if (res.status === 'error' || res.page > res.pages) {
            ctx.status = 404;
            return ctx.render('errors/notFound', { user });
        }
        return ctx.render('post/posts', {
            ...res,
            user,
            current_cate: cate,
        });
    });

    router.get('/tag/:tag', async (ctx, next) => {
        let tag = ctx.params.tag;
        let res = await Post.findByTag(tag);
        let user = ctx.session.user;

        if (res.status === 'error') {
            return next();
        } else {
            return ctx.render('post/posts', { ...res, user });
        }
    });
    router.get('/tag/:tag/page/:page', async (ctx, next) => {
        let { tag, page } = ctx.params;
        let { user } = ctx.session;
        let res = await Post.findByTag(tag);

        if (res.status === 'error' || res.page > res.pages) {
            ctx.status = 404;
            return ctx.render('errors/notFound', { user });
        }
        return ctx.render('post/posts', {
            ...res,
            user,
        });
    });

    router.get('/:url.html', async (ctx, next) => {
        let postUrl = ctx.params.url;
        let res = await Post.findByUrl(postUrl);
        let user = ctx.session.user;

        if (res.status === 'error') {
            return next();
        } else {
            return ctx.render('post/details', { user, ...res, current_cate: res.post.category });
        }
    });

    router.get('/new', async (ctx, next) => {
        let user = ctx.session.user;

        if (!user) {
            return next();
        }

        return ctx.render('post/new', {});
    });

    router.get('/:url/edit', async (ctx, next) => {
        let user = ctx.session.user;
        let postUrl = ctx.params.url;
        let res = await Post.findByUrl(postUrl);

        if (!user || res.status === 'error') {
            return next();
        }

        return ctx.render('post/edit', { user, ...res });
    });
}

