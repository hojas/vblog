import 'babel-polyfill'
import Vue from 'vue'
import VueHead from 'vue-head'

import App from './components/base/app.vue'
import router from './router'
import store from './store'

Vue.use(VueHead)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})
