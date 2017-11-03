<template>
    <layout-component>
        <template slot="body">
            <form class="col-6">
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" class="form-control" v-model="user.email">
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" class="form-control" v-model="user.password">
                </div>
                <a href="#" class="btn btn-primary" role="button" @click="signin">登录</a>
            </form>
        </template>
    </layout-component>
</template>

<script>
import layout from '../../components/base/layout.vue'

export default {
    components: {
        'layout-component': layout,
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async signin() {
            await this.$store.dispatch({
                type: 'signin',
                user: this.user
            })
            this.$router.push('/')
        }
    }
}
</script>

