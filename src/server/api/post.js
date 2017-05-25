import { Post } from '../models';

export default function postAPI(router) {
    // api of get
    router.get('/api/posts', async (ctx, next) => {
        let page = ctx.query.page || 1;
        let res = await Post.findByCate(null, page);

        ctx.body = res;
    });
    router.get('/api/post/:url', async (ctx, next) => {
        let url = ctx.params.url;
        let res = await Post.findByUrl(url);

        ctx.body = res;
    });
    router.get('/api/cate/:cate', async (ctx, next) => {
        let cate = ctx.params.cate;
        let res = await Post.findByCate(cate);

        ctx.body = res;
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

        let res = await Post.add(post);

        ctx.body = {
            ok: true,
            post,
        };
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

        await Post.edit(post);

        ctx.body = {
            ok: true,
            post,
        };
    });
}

