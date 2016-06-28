import md5 from '../common/md5';
import User from '../models/user';

const loginGet = function *(next) {
    if (this.session.user) {
        return this.redirect('/');
    }

    yield this.render('user/login.html', {
        ptitle: '登录',
    });

    yield next;
};
const loginPost = function *(next) {
    let body = this.request.body;
    let email = body.email;
    let password = body.password;

    yield User.findByMail(email).then(user => {
        if (user.password === md5(password)) {
            user.password = null;
            delete user.password;
            this.session.user = user;

            return this.redirect('/');
        } else {
            return this.redirect('/login');
        }
    }).catch(() => {
        return next;
    });

    yield next;
}

export default {
    loginGet,
    loginPost,
}

