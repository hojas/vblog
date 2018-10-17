<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">管理系统</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav @click="updatePath">
        <li class="nav-item">
          <nuxt-link class="nav-link"
            :class="{ active: path === '/admin' }"
            to="/admin">主面板</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link"
            :class="{ active: path === '/admin/users' }"
            to="/admin/users">用户</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link"
            :class="{ active: path === '/admin/categories' }"
            to="/admin/categories">分类</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link"
            :class="{ active: path === '/admin/posts' }"
            to="/admin/posts">文章</nuxt-link>
        </li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      path: '/admin',
    }
  },
  methods: {
    updatePath() {
      this.path = this.$router.history.current.fullPath
    },
  },
  mounted() {
    this.updatePath()
  },
}
</script>

<style>
</style>
