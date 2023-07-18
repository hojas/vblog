<template>
  <div>user id: {{ id }}</div>
</template>

<script>
export default {
  asyncData({ params }) {
    return { id: params.id }
  },
  data() {
    return {
    }
  }
}
</script>

<style>

</style>
