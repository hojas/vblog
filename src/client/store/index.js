import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import cates from './modules/cates';
import post from './modules/post';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        cates,
        post,
    }
});

