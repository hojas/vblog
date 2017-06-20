import { Post } from '../models';

export default function(router) {
    // get
    router.get('/api/posts', async (ctx, next) => {
        let page = ctx.query.page || 1;
        ctx.body = await Post.findByCate(null, page);
    });
    router.get('/api/post/:url', async (ctx, next) => {
        let url = ctx.params.url;
        ctx.body = await Post.findByUrl(url);
    });
    router.get('/api/cate/:cate', async (ctx, next) => {
        let cate = ctx.params.cate;
        ctx.body = await Post.findByCate(cate);
    });
    router.get('/api/tag/:tag', async (ctx, next) => {
        let tag = ctx.params.tag;
        ctx.body = await Post.findByTag(tag);
    });

    // api of post
    router.post('/api/new', async (ctx, next) => {
        let {
            title,
            content,
            category,
            tags,
        } = ctx.request.body;

        if (tags && tags.length) {
            tags = tags.replace(/\s+/g, '').split(',');
        }

        let author;
        if (ctx.session.user) {
            author = ctx.session.user.username;
        } else {
            return ctx.body = { ok: false, msg: '登录后才能发表文章' };
        }

        let post = new Post({
            author,
            title,
            content,
            category,
            tags,
        });

        try {
            await Post.add(post);
            ctx.body = {
                ok: true,
                post,
            };
        } catch (e) {
            ctx.body = {
                ok: false,
                post: null,
            };
        }

    });
    router.post('/api/edit', async (ctx, next) => {
        let {
            title,
            content,
            category,
            tags,
            url,
        } = ctx.request.body;

        content = content.trim();
        tags = tags.replace(/\s+/g, '').split(',');

        let post = {
            title,
            category,
            content,
            tags,
            url,
        };

        try {
            await Post.edit(post);
            ctx.body = {
                ok: true,
                post,
            };
        } catch (e) {
            ctx.body = {
                ok: false,
                post: null,
            };
        }
    });
}

