import Vue from 'vue';

import Pagination from '../components/pagination.vue';

if ($('#pagination').length) {
    const app = new Vue({
        el: '#pagination',
        render: h => h(Pagination),
    });
}

