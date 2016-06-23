import koaRouter from 'koa-router';
import home from '../controllers/home';
import page from '../controllers/page';
import { category, article, tag, newArticle,
    newArticlePost, editArticle, editArticlePost } from '../controllers/post';
import { login, loginPost } from '../controllers/user';

const router = koaRouter();

const routes = app => {
    app.use(router.routes());

    router.get('/', home);

    router.get('/about', page.about);
    router.get('/sitemap.html', page.sitemap);

    router.get('/:cat', category);
    router.get('/:id'+'.html', article);
    router.get('/tag/:tag', tag);

    router.get('/new', newArticle);
    router.post('/new', newArticlePost);

    router.get('/:id/edit', editArticle);
    router.post('/:id/edit', editArticlePost);

    router.get('/login', login);
    router.post('/login', loginPost);
};

export default routes;

