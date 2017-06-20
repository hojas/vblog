import user from './user';
import category from './cate';
import post from './post';
import comment from './comment';

export default function(router) {
    user(router);
    category(router);
    post(router);
    comment(router);
}

