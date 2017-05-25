<template>
    <div class="row">
        <form class="col-sm-6 col-sm-offset-3">
            <div class="form-group" :class="{ 'has-error': errEmail }">
                <label>邮箱</label>
                <input type="email" class="form-control" v-model="email">
                <span v-if="errEmail" class="help-block">请输入邮箱</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errPassword }">
                <label>密码</label>
                <input type="password" class="form-control" v-model="password">
                <span v-if="errPassword" class="help-block">请输入密码</span>
            </div>
            <button @click="signin" type="button" class="btn btn-primary">登录</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            errEmail: false,
            errPassword: false,
        };
    },
    methods: {
        validateEmail() {
            if (!this.email) {
                this.errEmail = true;
            }
        },
        validatePassword() {
            if (!this.password) {
                this.errPassword = true;
            }
        },
        async signin() {
            this.validateEmail();
            this.validatePassword();

            if (this.errEmail || this.errPassword) {
                return false;
            }

            let res = await axios.post('/api/signin', {
                email: this.email,
                password: this.password,
            });

            if (res.data.ok) {
                this.$store.dispatch({
                    type: 'getUser'
                });
                this.$router.push('/');
            }
        },
    },
}
</script>

<style scoped>
form {
    padding: 20px;
    margin-top: 50px;
    margin-bottom: 100px;
    border: solid 1px #eee;
}
</style>

