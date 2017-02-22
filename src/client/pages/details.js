import Vue from 'vue';

import Comment from '../components/comment.vue';

const app = new Vue({
    el: '#comment',
    render: h => h(Comment),
});

