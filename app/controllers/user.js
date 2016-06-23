import md5 from '../common/md5';
import User from '../models/user';

export const login = function *(next) {
    if (this.session.user) {
        return this.redirect('/');
    }

    yield this.render('user/login.html', {
        ptitle: '登录'
    });

    yield next;
};
export const loginPost = function *(next) {
    let self = this;
    let body = this.request.body;
    let email = body.email;
    let password = body.password;

    yield User.findByMail(email).then(function(user) {
        if (user.password === md5(password)) {
            user.password = null;
            delete user.password;
            self.session.user = user;

            return self.redirect('/');
        } else {
            return self.redirect('/login');
        }
    }, function() {
        return next;
    });

    yield next;
}

