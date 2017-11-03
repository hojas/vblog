import axios from 'axios'

const fetch = axios.create({
    baseURL: '/api/',
    time: 1000,
    withCredentials: true,
})

const user = {
    getUser: 'user',
    signin: 'user/signin',
    signup: 'user/signup',
    logout: 'user/logout',
    findByPage: page => `users/page/${page}`,
}

const category = {
    findAll: 'categories',
    add: 'category/add',
    edit: 'category/edit',
    remove: 'category/delete',
}

const post = {
    add: 'post/add',
    edit: 'post/edit',
    findByPage: page => `posts/page/${page}`,
    findByCate: (cate, page) => `cate/${cate}/page/${page}`,
    findByTag: (tag, page) => `tag/${tag}/page/${page}`,
    findByUrl: url => `post/${url}`,
}

export { fetch, user, category, post }
