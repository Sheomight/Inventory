<script lang="ts" setup>
import { ref } from 'vue'
import Sun from '../icons/Sun.vue'
import Moon from '../icons/Moon.vue'

const isLight = ref(true)

const changeTheme = () => {
  isLight.value = !isLight.value

  if (isLight.value) {
    document.body.removeAttribute('dark')
  } else {
    document.body.setAttribute('dark', '')
  }
}
</script>

<template>
  <div class="theme-switch clickable" @click="changeTheme">
    <Sun v-if="isLight" width="28" height="28" />
    <Moon v-else width="28" height="28" />
  </div>
</template>

<style lang="scss" scoped>
$b: '.theme-switch';

#{$b} {
  color: var(--color-light);
  position: absolute;
  right: 18px;
  top: 18px;
}
</style>
