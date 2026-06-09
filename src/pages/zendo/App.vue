<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.title {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
  text-align: center;
  position: sticky;
  top: 0px;
  z-index: 99;
  margin: 0;
}
</style>