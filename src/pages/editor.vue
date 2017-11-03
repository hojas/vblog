<template>
    <layout-component>
        <template slot="body" class="editor">
            <form>
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" class="form-control" v-model="title">
                </div>
                <div class="form-group">
                    <label>分类</label>
                    <select class="form-control" v-model="cate">
                        <option
                            v-for="cate in cates.cates"
                            :value="cate"
                            >{{ cate.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>标签</label>
                    <input class="form-control" v-model="tag" @keyup.enter="addTag">
                    <div>
                        <span class="badge badge-info"
                            v-for="tag in tags"
                            @click.enter="removeTag(tag)">{{ tag }}</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>内容</label>
                    <textarea class="form-control" v-model="content" placeholder="请使用 markdown"></textarea>
                </div>
                <div class="form-group">
                    <label>URL</label>
                    <input class="form-control" v-model="url">
                </div>
                <a class="btn btn-primary" role="button" href="#" @click="submit">发布</a>
            </form>
        </template>
    </layout-component>
</template>

<script>
import layout from '../components/base/layout.vue'
import { fetch, category, post } from '../api'

export default {
    components: {
        'layout-component': layout,
    },
    data() {
        return {
            title: '',
            cate: {},
            url: '',
            content: '',
            tags: [],
            tag: '',
        }
    },
    computed: {
        cates() {
            return this.$store.getters.cates
        }
    },
    methods: {
        addTag() {
            let tag = this.tag.trim()
            if (!this.tags.includes(tag)) {
                this.tags.push(tag)
            }
            this.tag = ''
        },
        removeTag(tag) {
            let index = this.tags.findIndex(value => value === tag)
            this.tags.splice(index, 1)
        },
        async submit() {
            let p = {
                title: this.title,
                category: this.cate,
                url: this.url,
                content: this.content,
                tags: this.tags,
            }
            await fetch.post(post.add, { post: p })
            this.$router.push(`/p/${this.url}.html`)
        }
    }
}
</script>

<style scoped>
.badge {
    margin-right: 4px;
    cursor: pointer;
}
textarea {
    width: 100%;
    min-height: 500px;
}
</style>

