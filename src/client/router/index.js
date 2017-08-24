import Vue from 'vue'
import VueRouter from 'vue-router'

import view from './view'
import user from './user'
import post from './post'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: view('home'),
    },
    {
        path: '/page/:page',
        component: view('home'),
    },
    ...user,
    ...post,
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes,
})

router.beforeEach((route, redirect, next) => {
    window.scrollTo(0, 0)
    next()
})

export default router
