import { User } from '../models';

export default function userAPI(router) {
    router.post('/api/signin', async (ctx, next) => {
        let {
            email,
            password,
        } = ctx.request.body;

        let res = await User.login(ctx, email, password);

        if (res.status === 'success') {
            return ctx.redirect('/');
        }

        if (res.status === 'error') {
            return ctx.redirect('/signin');
        }
    });

    router.post('/api/signup', async (ctx, next) => {
        let {
            username,
            email,
            password,
            repassword,
        } = ctx.request.body;

        if (password !== repassword) {
            ctx.redirect('/signup', { status: 'error', msg: '两次密码不一致', user: null });
        }

        let user = new User({
            username,
            email,
            password,
        });

        let res = await User.add(ctx, user);

        if (res.status === 'success') {
            return ctx.redirect('/', ...res);
        }

        return ctx.redirect('/signup', ...res);
    });
}

