<template>
    <layout-component>
        <template slot="body">
            <form class="col-6">
                <div class="form-group">
                    <label>邮箱</label>
                    <input type="email" class="form-control" v-model="user.email">
                </div>
                <div class="form-group">
                    <label>昵称</label>
                    <input type="email" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label>密码</label>
                    <input type="password" class="form-control" v-model="user.password">
                </div>
                <div class="form-group">
                    <label>确认密码</label>
                    <input type="password" class="form-control" v-model="user.repassword">
                </div>
                <a href="#" class="btn btn-primary" role="button" @click="signup">注册</a>
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
                username: '',
                password: '',
                repassword: '',
            }
        }
    },
    methods: {
        async singup() {
            await this.$store.dispatch({
                type: 'signup',
                user: this.user
            })
            this.$router.push('/')
        }
    }
}
</script>
