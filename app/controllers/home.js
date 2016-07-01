import Post from '../models/post';

export default function *(next) {
    let page = this.params.page;

    yield Post.findByCate(null, page).then(res => {
        return this.render('home/index.html', {
            pagination: res,
            user: this.session.user,
        });
    });

    yield next;
}

