import Post from '../models/post';

export default function *(next) {
    let self = this;

    // TODO
    // 分页功能
    yield Post.findByCat().then(posts => {
        return self.render('home/index.html', {
            posts: posts,
            user: self.session.user,
        });
    });

    yield next;
}

