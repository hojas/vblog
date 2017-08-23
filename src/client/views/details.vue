<template>
    <Container>
        <div slot="body" class="post">
            <h2>{{ post.title }}</h2>
            <div class="post-meta">
                <span><i class="fa fa-user"></i>{{ post.author }}</span>
                <span><i class="fa fa-clock-o"></i>{{ date }}</span>
                <span><i class="fa fa-eye"></i>{{ post.views }}</span>
                <span>
                    <i class="fa fa-tag"></i>
                    <router-link v-for="tag in post.tags" class="label label-info" :to="'/tag/' + tag">{{ tag }}</router-link>
                </span>
            </div>
            <div class="post-content" v-html="content"></div>
            <div>转载请注明出处：
                <a href="'http://www.w3clog.com/' + post.url + '.html'">{{ post.title }} - 前端日志网</a>
            </div>
        </div>
    </Container>
</template>

<script>
import axios from 'axios';
import { marked, prettyDate } from '../utils';
import Container from '../components/container.vue';

export default {
    data() {
        return {
            url: this.$route.params.id,
            post: {},
            content: '',
            date: '',
        };
    },
    methods: {
        async getPost() {
            let res = await axios.get('/api/post/' + this.url);

            if (res.data.ok) {
                this.post = res.data.post;
                this.content = marked(this.post.content);
                this.date = prettyDate(this.post.createdAt);
            }
        },
    },
    created() {
        this.getPost();
    }
}
</script>

<style scoped>
.post {
    padding: 10px;
    box-shadow: 0 0 1px 1px #eee;
    font-weight: 100;
}
h2 {
    padding: 10px 0;
    margin: 10px 0;
    text-align: center;
    border-bottom: solid 1px #eee;
}
.post-meta {
    padding: 10px 0;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 500;
}
.post-meta span {
    display: inline-block;
    margin-right: 10px;
}
.post-meta span .fa {
    margin-right: 4px;
}

</style>

