<template>
  <div class="signup">
    <form>
      <div class="input">
        <div class="label">昵称</div>
        <input type="text" :value="username">
      </div>
      <div class="input">
        <div class="label">邮箱</div>
        <input type="email" :value="email">
      </div>
      <div class="input">
        <div class="label">密码</div>
        <input type="password" :value="password">
      </div>
      <div class="input">
        <div class="label">确认密码</div>
        <input type="password" :value="repassword">
      </div>
      <div class="input">
        <button type="button">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repassword: '',
    }
  },
}
</script>

<style scoped>
.signup {
  width: 35%;
  padding: 20px;
  margin: 0 auto;
  border: solid 1px #eee;
}
.input {
  margin-bottom: 10px;
}
.label {
  margin-bottom: 4px;
}
button {
  font-size: 14px;
  padding: 4px 12px;
}
</style>
