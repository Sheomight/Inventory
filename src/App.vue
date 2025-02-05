<script setup lang="ts">
import BottomElement from './components/BottomElement.vue';

</script>

<template>
  <div class="main">
    <BottomElement />
  </div>
</template>

<style lang="scss" scoped>
$b: ".main";

#{$b} {
  margin: 200px 150px;
  height: 300px;
}
</style>
