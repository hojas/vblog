<template>
  <div class="base">
    <default-header></default-header>
    <div class="content">
      <nuxt />
    </div>
    <default-footer></default-footer>
  </div>
</template>

<script>
import Header from '@/components/layouts/header.vue'
import Footer from '@/components/layouts/footer.vue'

export default {
  components: {
    'default-header': Header,
    'default-footer': Footer,
  }
}
</script>

<style scoped>
.content {
  width: 70%;
  padding: 20px 0;
  margin: 0 auto;
}
</style>
