<template>
  <div class="header">
    <ul class="left-nav">
      <li>
        <nuxt-link to="/">首页</nuxt-link>
      </li>
      <li v-for="cate in cates" :key="cate.url">
        <nuxt-link :to="'/category/' + cate.url">{{ cate.name }}</nuxt-link>
      </li>
    </ul>
    <ul class="right-nav">
      <li>
        <nuxt-link to="/signup">注册</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/signin">登录</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cates: [{
        name: '前端',
        url: 'frontend',
      }, {
        name: 'Node.js',
        url: 'url',
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 10px 50px;
  background: #333;
  border: solid 2px #000;
  overflow: hidden;

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;
  }
  a {
    color: #ccc;
    font-size: 14px;
    text-decoration: none;

    &:hover,
    &:focus {
      color: #fff;
    }
  }
}
.left-nav {
  float: left;

  li {
    float: left;
    margin-right: 10px;
  }
}
.right-nav {
  float: right;

  li {
    float: right;
    margin-left: 10px;
  }
}
</style>
