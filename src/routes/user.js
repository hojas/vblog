import { User } from '../models';

export default function userRoutes(router) {
    router.get('/signin', async (ctx, next) => {
        let user = ctx.session.user;
        if (user) {
            ctx.redirect('/');
        }
        await ctx.render('sign/signin', {});
    });

    router.get('/logout', async (ctx, next) => {
        ctx.session.user = null;
        ctx.redirect('/');
    });

    router.post('/api/signin', async (ctx, next) => {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        let res = await User.login(ctx, email, password);

        if (res.status === 'success') {
            ctx.redirect('/');
        }
        if (res.status === 'error') {
            ctx.redirect('/signin');
        }
    });

    /*
    router.get('/signup', async (ctx, next) => {
        let user = ctx.session.user;
        if (user) {
            ctx.redirect('/');
        }
        await ctx.render('sign/signup', {});
    });
    router.post('/api/register', async (ctx, next) => {
        let username = ctx.request.body.username;
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        let repassword = ctx.request.body.repassword;

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
            ctx.redirect('/', ...res);
        }
        if (res.status === 'error') {
            ctx.redirect('/signup', ...res);
        }
    });
    */
}

