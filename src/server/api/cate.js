import { Category } from '../models';

export default function(router) {
    router.get('/api/cates', async (ctx, next) => {
        let res = await Category.findAll();
        ctx.body = res;
    });
}

