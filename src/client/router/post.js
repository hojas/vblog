import view from './view';

export default [{
    path: '/new',
    component: view('new'),
}, {
    // 详情页
    path: '/:id.html',
    component: view('details'),
}, {
    // 分类下文章列表页
    path: '/:cate',
    component: view('cate'),
}, {
    path: '/:cate/page/:page',
    component: view('cate'),
}, {
    // 标签下文章列表页
    path: '/:tag',
    component: view('tag'),
}]

