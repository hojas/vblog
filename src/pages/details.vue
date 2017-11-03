<template>
    <layout-component>
        <div slot="body" class="post">
            <h2>{{ post.title }}</h2>
            <div class="post-meta">
                <span><i class="fa fa-user"></i>{{ post.author.username }}</span>
                <span><i class="fa fa-clock-o"></i>{{ post.prettyCreated }}</span>
                <span><i class="fa fa-eye"></i>{{ post.views }}</span>
                <span>
                    <i class="fa fa-tag"></i>
                    <router-link class="label label-info"
                        v-for="tag in post.tags"
                        :to="'/tag/' + tag"
                        :key="tag.id">{{ tag }}</router-link>
                </span>
            </div>
            <div class="post-content" v-html="post.markedContent"></div>
            <div class="post-footer">转载请注明出处：
                <a :href="'http://www.w3clog.com/' + post.url">{{ post.title }} - 前端日志网</a>
            </div>
        </div>
    </layout-component>
</template>

<script>
import layout from '../components/base/layout.vue'
import { fetch, post } from '../api'

export default {
    components: {
        'layout-component': layout,
    },
    data() {
        return {
            post: {},
        }
    },
    computed: {
        url() {
            return this.$route.params.id
        }
    },
    methods: {
        async getPost() {
            let res = await fetch.get(post.findByUrl(this.url))

            if (res.data.ok) {
                this.post = res.data.post
            }
        }
    },
    mounted() {
        this.getPost()
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
}
.post-meta span {
    display: inline-block;
    margin-right: 10px;
}
.post-meta span .fa {
    margin-right: 4px;
}
.post-content {
    padding: 0 0 20px;
    color: #333;
    font-size: 16px;
}
.post-footer {
    font-size: 14px;
}
</style>

