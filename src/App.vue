<script setup lang="ts">
import LeftElement from './components/LeftElement.vue'
</script>

<template>
  <div class="main">
    <LeftElement />
  </div>
</template>

<style lang="scss" scoped>
$b: '.main';

#{$b} {
  margin: 200px 150px;
  height: 800px;
}
</style>
