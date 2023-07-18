//import User from './api/User'
import Category from '../api/Category'
import Post from '../api/Post'

export default router => {
  router
    /*
    .post('/api/users/signup', User.signUp)
    .post('/api/users/signin', User.signIn)
    .get('/api/users/logout', User.logout)
    .get('/api/users/current', User.getCurrentUser)
    .get('/api/users/all', User.findAll)
    */

    .get('/api/categories', Category.findAll)
    .post('/api/categories', Category.add)
    .put('/api/categories', Category.update)
    .delete('/api/categories', Category.remove)

    .get('/api/posts/:id', Post.findById)
    .get('/api/posts', Post.findAll)
    .post('/api/posts', Post.add)
    .put('/api/posts', Post.update)
    .put('/api/posts/content', Post.updateContent)
    .delete('/api/posts', Post.remove)
}
