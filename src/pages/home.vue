<template>
    <layout-component>
        <template slot="body">
            <list-component :posts="posts"></list-component>
        </template>
    </layout-component>
</template>

<script>
import layout from '../components/base/layout.vue';
import list from '../components/list.vue'
import { fetch, post } from '../api'

export default {
    components: {
        'layout-component': layout,
        'list-component': list,
    },
    data() {
        return {
            posts: [],
            total: 0,
            pages: 0,
        };
    },
    computed: {
        page() {
            return this.$route.params.page
        }
    },
    methods: {
        async getPosts() {
            let res = await fetch.get(post.findByPage(this.page))

            if (res.data.ok) {
                this.posts = res.data.posts.docs
                this.total = res.data.posts.total
                this.pages = res.data.posts.pages
            }
        }
    },
    mounted() {
        this.getPosts()
    }
}
</script>
