<template>
  <div class="footer">
    ©2018 <nuxt-link to="/">前端日志网</nuxt-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 10px 0;
  color: #333;
  background: #ccc;
  font-size: 14px;
  text-align: center;

  a {
    color: #000;
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: none;
    }
  }
}
</style>
