<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">前端日志网</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggle-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav">
                    <router-link class="nav-item" tag="li" to="/" exact>
                        <a class="nav-link">首页</a>
                    </router-link>
                    <router-link class="nav-item" v-if="cates.cates"
                            v-for="cate in cates.cates"
                            tag="li"
                            :to="'/' + cate.url">
                        <a class="nav-link">{{ cate.name }}</a>
                    </router-link>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <template v-if="user && user.user && user.user.username">
                        <li class="nav-item">
                            <a class="nav-link">Hi, {{ user.user.username }}</a>
                        </li>
                        <router-link class="nav-item" tag="li" to="/new">
                            <a class="nav-link">写文章</a>
                        </router-link>
                        <li class="nav-item">
                            <a class="nav-link" @click="logout">退出</a>
                        </li>
                    </template>
                    <template v-else>
                        <router-link class="nav-item" tag="li" to="/signin">
                            <a class="nav-link">登录</a>
                        </router-link>
                        <router-link class="nav-item" tag="li" to="/signup">
                            <a class="nav-link">注册</a>
                        </router-link>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    computed: {
        user() {
            return this.$store.getters.currentUser
        },
        cates() {
            return this.$store.getters.cates
        }
    },
    methods: {
        getCates() {
            this.$store.dispatch({
                type: 'getCates'
            })
        },
        getUser() {
            this.$store.dispatch({
                type: 'getUser'
            })
        },
        logout() {
            this.$store.dispatch({ type: 'logout' })
            this.$router.push('/')
        },
    },
    mounted() {
        this.getCates()
        this.getUser()
    },
}
</script>

