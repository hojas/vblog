<template>
<div class="comment-box">
    <h4>发表评论</h4>
    <div class="form-group" :class="{ 'has-error': validatesForm.username }">
        <label class="control-label">姓名*</label>
        <input v-model="comment.username" type="text" class="form-control" />
    </div>
    <div class="form-group" :class="{ 'has-error': validatesForm.email }">
        <label class="control-label">邮箱*</label>
        <input v-model="comment.email" type="email" class="form-control email" />
    </div>
    <div class="form-group">
        <label class="control-label">站点</label>
        <input v-model="comment.site" type="text" class="form-control" />
    </div>
    <div class="form-group" :class="{ 'has-error': validatesForm.content }">
        <label class="control-label">评论</label>
        <textarea v-model="comment.content" class="form-control"></textarea>
    </div>
    <button @click="onSubmit" type="button" class="btn btn-info">发表评论</button>
    <div class="comment-list">
        <div v-for="comment in comments" class="comment-item">
            <div class="pull-left">
                <img src="/img/user.png">
            </div>
            <div class="pull-left">
                <div class="comment-author">
                    {{ comment.author.username }}
                </div>
                <div class="comment-date">
                    {{ comment.createdAt }}
                </div>
            </div>
            <div class="comment-content">
                {{ comment.content }}
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { get, post } from '../../common/fetch';

export default {
    data() {
        return {
            comments: [],
            comment: {
                username: '',
                email: '',
                site: '',
                postUrl: '',
                content: '',
            },
            validatesForm: {
                username: false,
                email: false,
                content: false,
            },
        };
    },
    methods: {
        validates() {
            let state = false;
            if (!this.comment.username) {
                this.validatesForm.username = true;
                state = true;
            }
            if (!this.comment.email) {
                this.validatesForm.email = true;
                state = true;
            }
            if (!this.comment.content) {
                this.validatesForm.content = true;
                state = true;
            }

            return state;
        },
        async onSubmit() {
            if (this.validates()) {
                return false;
            }

            await post(`/api/comment`, { ...this.comment });
            await this.getComments();
            this.comment = {};
        },
        async getComments() {
            let res = await get(`/api/comments/${this.comment.postUrl}`);
            this.comments = res.comments;
        },
    },
    async created() {
        this.comment.postUrl = /\d+/.exec(window.location.pathname)[0];
        await this.getComments();
    },
}
</script>

<style lang="scss" scoped>
.comment-box {
    padding: 20px 0 0;
    margin: 10px 0;
    border-top: solid 1px #eee;
}
h4 {
    font-size: 24px;
}
input {
    width: 50%;
}
textarea {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 200px;
    margin-bottom: 10px;
}
.comment-item {
    padding: 20px 10px 0;
    margin: 10px 0;
    border-top: solid 1px #eee;
    overflow: hidden;

    img {
        width: 35px;
        margin-right: 10px;
        border-radius: 35px;
    }
    .comment-author {
        font-size: 12px;
        font-weight: 700;
    }
    .comment-date {
        font-size: 12px;
        font-style: italic;
    }
    .comment-content {
        padding: 20px 0 0;
        font-size: 14px;
        clear: both;
    }
}
</style>

