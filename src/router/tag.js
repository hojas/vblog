const tag = () => import('../pages/tag.vue')

export default [
    {
        path: '/tag/:tag',
        component: tag,
    },
    {
        path: '/tag/:tag/page/:page',
        component: tag,
    },
]
