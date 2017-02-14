import { User } from '../models';

export default function userRoutes(router) {
    router.get('/signin', async (ctx, next) => {
        let { user } = ctx.session;

        if (user) {
            return ctx.redirect('/');
        }
        return ctx.render('sign/signin', {});
    });

    router.get('/logout', async (ctx, next) => {
        ctx.session.user = null;
        return ctx.redirect('/');
    });

    router.get('/signup', async (ctx, next) => {
        let user = ctx.session.user;
        if (user) {
            return ctx.redirect('/');
        }
        return ctx.render('sign/signup', {});
    });
}

