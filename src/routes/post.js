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
            return ctx.render('post/posts', { user, ...res, current_cate: cate });
        }
    });

    router.get('/tag/:tag', async (ctx, next) => {
        let tag = ctx.params.tag;
        let res = await Post.findByTag(tag);
        let user = ctx.session.user;

        if (res.status === 'error') {
            return next();
        } else {
            return ctx.render('post/posts', { user, ...res });
        }
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

