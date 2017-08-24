import view from './view'

export default [
    {
        // 登录
        path: '/signin',
        component: view('signin'),
    },
    {
        // 注册
        path: '/signup',
        component: view('signup'),
    },
    {
        path: '/home',
        component: view('user'),
    },
]
