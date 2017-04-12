import Vue from 'vue';

import Comment from '../components/comment.vue';

if ($('#comment').length) {
    const app = new Vue({
        el: '#comment',
        render: h => h(Comment),
    });
}

