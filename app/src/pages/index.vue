<template>
  <side-layout>
    <div slot="body">home</div>
    <div slot="side">side</div>
  </side-layout>
</template>

<script>
import SideLayout from '@/components/layouts/side-layout.vue'

export default {
  components: {
    'side-layout': SideLayout,
  }
}
</script>

<style>
</style>
