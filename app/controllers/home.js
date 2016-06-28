import Post from '../models/post';

export default function *(next) {
    // TODO
    // 分页功能
    yield Post.findByCat().then(posts => {
        return this.render('home/index.html', {
            posts: posts,
            user: this.session.user,
        });
    });

    yield next;
}

