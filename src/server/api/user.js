import { User } from '../models';

export default function userAPI(router) {
    router.post('/api/signin', async (ctx, next) => {
        let {
            email,
            password,
        } = ctx.request.body;

        let res = await User.login(ctx, email, password);
        ctx.body = res;
    });

    router.post('/api/signup', async (ctx, next) => {
        let {
            username,
            email,
            password,
            repassword,
        } = ctx.request.body;

        if (password !== repassword) {
            ctx.body = { ok: false, msg: '两次密码不一致', user: null };
        } else {
            let user = new User({
                username,
                email,
                password,
            });

            let res = await User.add(ctx, user);
            ctx.body = res;
        }
    });

    router.get('/api/user', async (ctx, next) => {
        if (ctx.session.user) {
            ctx.body = { ok: true, user: ctx.session.user };
        } else {
            ctx.body = { ok: false, user: null };
        }
    });

    router.get('/api/logout', async (ctx, next) => {
        delete ctx.session.user;
        ctx.body = { ok: true, msg: '退出成功' };
    });
}

