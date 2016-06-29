import koaRouter from 'koa-router';
import home from '../controllers/home';
import page from '../controllers/page';
import post from '../controllers/post';
import user from '../controllers/user';

const router = koaRouter();

const routes = app => {
    app.use(router.routes());

    router.get('/', home);

    router.get('/about', page.about);
    router.get('/sitemap.html', page.sitemap);
    router.get('/nav.html', page.nav);

    router.get('/:cate', post.category);
    router.get('/:id'+'.html', post.article);
    router.get('/tag/:tag', post.tag);

    router.get('/new', post.newArticleGet);
    router.post('/new', post.newArticlePost);

    router.get('/:id/edit', post.editArticleGet);
    router.post('/:id/edit', post.editArticlePost);

    router.get('/login', user.loginGet);
    router.post('/login', user.loginPost);
};

export default routes;

