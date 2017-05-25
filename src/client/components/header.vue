<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <router-link class="navbar-brand" to="/">前端日志网</router-link>
            </div>

            <div class="collapse navbar-collapse" id="navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link tag="li" to="/" exact>
                        <a>首页</a>
                    </router-link>
                    <router-link tag="li" v-for="cate in cates.list" :to="'/' + cate.url">
                        <a>{{ cate.name }}</a>
                    </router-link>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <template v-if="user.username">
                        <router-link tag="li" to="/home">
                            <a>{{ user.username }}</a>
                        </router-link>
                        <router-link tag="li" to="/new">
                            <a>写博客</a>
                        </router-link>
                        <li>
                            <a href="#" @click.prevent="logout">退出</a>
                        </li>
                    </template>
                    <template v-else>
                        <router-link tag="li" to="/signin">
                            <a>登录</a>
                        </router-link>
                        <router-link tag="li" to="/signup">
                            <a>注册</a>
                        </router-link>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        cates() {
            return this.$store.state.cates;
        }
    },
    methods: {
        async getCates() {
            this.$store.dispatch({
                type: 'getCates'
            });
        },
        getUser() {
            this.$store.dispatch({
                type: 'getUser'
            });
        },
        async logout() {
            let res = await axios.get('/api/logout');
            this.$store.dispatch({
                type: 'logout'
            });
            this.$router.push('/');
        },
    },
    async mounted() {
        this.getCates();
        this.getUser();
    },
}
</script>

<style>
</style>

