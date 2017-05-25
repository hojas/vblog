<template>
    <form>
        <div class="form-group">
            <label>标题</label>
            <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
            <label>分类</label>
            <select class="form-control" v-model="category">
                <option v-for="cate in cates" :value="cate.url">{{ cate.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label>标签</label>
            <input type="text" class="form-control" v-model="tags">
        </div>
        <div class="form-group">
            <label>正文</label>
            <textarea class="form-control" rows="5" v-model="content"></textarea>
        </div>
        <button @click="newPost" type="button" class="btn btn-primary">发表</button>
    </form>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            title: '',
            category: '',
            content: '',
            tags: '',
        };
    },
    computed: {
        cates() {
            return this.$store.state.cates.list;
        },
        post() {
            return this.$store.state.post.data;
        }
    },
    watch: {
        post() {
            this.$router.push('/' + this.post.url + '.html');
        }
    },
    methods: {
        newPost() {
            this.$store.dispatch({
                type: 'newPost',
                post: {
                    title: this.title,
                    content: this.content,
                    category: this.category,
                    tags: this.tags,
                }
            });
        },
    },
}
</script>

