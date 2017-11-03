const details = () => import('../pages/details.vue')
const editor = () => import('../pages/editor.vue')

export default [
    {
        path: '/new',
        component: editor,
    },
    {
        path: '/p/:id.html',
        component: details,
    },
]
