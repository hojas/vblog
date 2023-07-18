<template>
  <div class="users">
    <Table :columns="columns" :data="users"></Table>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      users: [],
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {},
  },
}
</script>

<style scoped>
</style>
