<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    max-width: calc(1024px + 30px);
    padding: 0 15px;
    margin: 0 auto;
  }
</style>