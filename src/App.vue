<script setup lang="ts">
import BottomElement from './components/BottomElement.vue'
import Inventory from './components/Inventory.vue'
import LeftElement from './components/LeftElement.vue'
</script>

<template>
  <div class="main flex align-center justify-center">
    <div class="main__element">
      <LeftElement class="main__element-left" />
      <Inventory class="main__element-inventory" />
      <BottomElement class="main__element-bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$b: '.main';

#{$b} {
  height: 100vh;

  &__element {
    display: grid;
    justify-content: start;
    grid-template-areas: 'left-element main__element' 'bottom-element bottom-element';
    gap: 24px;

    &-left {
      grid-area: left-element;
    }

    &-inventory {
      grid-area: main__element;
    }

    &-bottom {
      grid-area: bottom-element;
    }
  }
}
</style>
