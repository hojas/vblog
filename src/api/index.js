import user from './user';
import post from './post';

export default function initAPI(router) {
    user(router);
    post(router);
}

