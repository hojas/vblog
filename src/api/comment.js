import { Comment } from '../models';

export default function commentAPI(router) {
    router.post('/api/comment', async (ctx, next) => {
        let {
            username,
            email,
            content,
        } = ctx.request.body;

        let comment = {
            username,
            email,
            content,
        };

        let res = await Comment.add(comment);
        return {
            ...res,
        }
    });
}

