const signin = () => import('../pages/user/signin.vue')
const signup = () => import('../pages/user/signup.vue')

export default [
    {
        path: '/signin',
        component: signin,
    },
    {
        path: '/signup',
        component: signup,
    },
]
