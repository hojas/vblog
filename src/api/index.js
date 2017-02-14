import user from './user';
import post from './post';
import comment from './comment';

export default function initAPI(router) {
    user(router);
    post(router);
    comment(router);
}

