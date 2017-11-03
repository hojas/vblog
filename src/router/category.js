const category = () => import('../pages/category.vue')

export default [
    {
        path: '/:cate',
        component: category,
    },
    {
        path: '/:cate/page/:page',
        component: category,
    },
]
