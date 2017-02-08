import pangu from 'pangu';
import { Post } from '../models';

export default function postAPI(router) {
    router.post('/api/new', async (ctx, next) => {
        let {
            title,
            content,
            category,
            tags,
        } = ctx.request.body;

        title = pangu.spacing(title);
        content = pangu.spacing(content);
        tags = tags.replace(/\s+/g, '').split(',');

        let post = {
            title,
            content,
            category,
            tags,
        };

        let res = await Post.add(post);

        return ctx.redirect(`/${res.post.url}.html`);
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
        return ctx.redirect(`/${url}.html`);
    });
}

