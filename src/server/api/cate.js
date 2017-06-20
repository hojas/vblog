import { Category } from '../models';

export default function(router) {
    router.get('/api/cates', async (ctx, next) => {
        ctx.body = await Category.findAll();
    });
}

