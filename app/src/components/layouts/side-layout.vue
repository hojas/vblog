<template>
  <div class="side-layout">
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="side">
      <slot name="side"></slot>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.side-layout {
  overflow: hidden;
}
.body {
  width: 70%;
  float: left;
}
.side {
  width: 30%;
  float: right;
}
</style>
