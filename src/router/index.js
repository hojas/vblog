import Vue from 'vue'
import VueRouter from 'vue-router'

import user from './user'
import category from './category'
import tag from './tag'
import post from './post'

const home = () => import('../pages/home.vue')
const notFound = () => import('../pages/notFound.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: home,
    },
    {
        path: '/page/:page',
        component: home,
    },
    ...user,
    ...post,
    ...category,
    ...tag,
    {
        path: '*',
        component: notFound,
    },
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { x: 0, y: 0 }
    },
})

export default router
