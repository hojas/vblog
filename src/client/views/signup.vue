<template>
    <div class="row">
        <form class="col-sm-6 col-sm-offset-3">
            <div class="form-group" :class="{ 'has-error': errUsername }">
                <label>昵称</label>
                <input type="text" class="form-control" v-model="username">
                <span v-if="errUsername" class="help-block">请输入用户名</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errEmail }">
                <label>邮箱</label>
                <input type="email" class="form-control" v-model="email">
                <span v-if="errEmail" class="help-block">请输入正确的邮箱</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errPassword }">
                <label>密码</label>
                <input type="password" class="form-control" v-model="password">
                <span v-if="errPassword" class="help-block">请输入密码</span>
            </div>
            <div class="form-group" :class="{ 'has-error': errRepassword }">
                <label>确认密码</label>
                <input type="password" class="form-control" v-model="repassword">
                <span v-if="errRepassword" class="help-block">两次输入的密码不相等</span>
            </div>
            <button @click="signup" type="button" class="btn btn-primary">注册</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            repassword: '',

            errUsername: false,
            errEmail: false,
            errPassword: false,
            errRepassword: false,
        };
    },
    watch: {
        username() {
            if (this.username) {
                this.errUsername = false;
            }
        },
        email() {
            if (this.email) {
                this.errEmail = false;
            }
        },
        password() {
            if (this.password) {
                this.errPassword = false;
            }
        },
        repassword() {
            if (this.repassword == this.password) {
                this.errRepassword = false;
            }
        },
    },
    methods: {
        validateUsername() {
            if (!this.username) {
                this.errUsername = true;
            }
        },
        validateEmail() {
            if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(this.email)) {
                this.errEmail = true;
            }
        },
        validatePassword() {
            if (!this.password) {
                this.errPassword = true;
            }
        },
        validateRepassword() {
            if (this.password != this.repassword) {
                this.errRepassword = true;
            }
        },
        async signup() {
            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            this.validateRepassword();

            if (this.errUsername || this.errEmail
                || this.errPassword || this.errRepassword) {
                return false;
            }

            let res = await axios.post('/api/signup', {
                username: this.username,
                email: this.email,
                password: this.password,
                repassword: this.repassword,
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

