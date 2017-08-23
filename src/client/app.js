import 'babel-polyfill';
import Vue from 'vue';
import './styles.css';

import App from './app.vue';
import router from './router';
import store from './store';

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h  => h(App),
});

