<script setup lang="ts">
import BottomElement from './components/BottomElement.vue'
import Inventory from './components/Inventory.vue'
import LeftElement from './components/LeftElement.vue'
</script>

<template>
  <div class="main">
    <LeftElement class="main__left" />
    <Inventory class="main__inventory" />
    <BottomElement class="main__bottom" />
  </div>
</template>

<style lang="scss" scoped>
$b: '.main';

#{$b} {
  display: grid;
  justify-content: start;
  grid-template-areas: 'left-element main-element' 'bottom-element bottom-element';
  gap: 24px;

  &__left {
    grid-area: left-element;
  }

  &__inventory {
    grid-area: main-element;
  }

  &__bottom {
    grid-area: bottom-element;
  }
}
</style>
