<template>
    <div>
        <List :posts="posts"></List>
        <Pagination v-if="total > 0" :total="total" :page="page" :pages="pages"></Pagination>
    </div>
</template>

<script>
import axios from 'axios';
import List from '../components/list.vue';
import Pagination from '../components/pagination.vue';

export default {
    components: {
        List,
        Pagination,
    },
    data() {
        return {
            cate: this.$route.params.cate,
            posts: [],
            page: parseInt(this.$route.params.page) || 1,
            total: 0,
            pages: 0,
        };
    },
    methods: {
        async getPosts() {
            let res = await axios.get('/api/cate/' + this.cate);

            if (res.data.ok) {
                this.posts = res.data.posts.docs;
                this.total = res.data.posts.total;
                this.pages = res.data.posts.pages;
            }
        }
    },
    created() {
        this.getPosts();
    },
}
</script>

