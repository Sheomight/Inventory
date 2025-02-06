<script lang="ts" setup>
import Close from './icons/Close.vue'
import SkeletonLoading from './UI/SkeletonLoading.vue'
</script>

<template>
  <div class="bottom-element flex align-center">
    <div class="bottom-element__content">
      <slot>
        <SkeletonLoading class="bottom-element__skeleton" type="block" block-rounding="large" />
      </slot>
    </div>
    <div class="bottom-element__close-btn flex clickable" role="button">
      <Close width="12" height="12" aria-label="close" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$b: '.bottom-element';

#{$b} {
  position: relative;
  padding: 18px;
  border: var(--border);
  background-color: var(--color-gray-1);
  border-radius: var(--border-radius-large);

  &__content {
    width: 90%;
  }

  &__close-btn {
    position: absolute;
    right: 8px;
    top: 8px;
    transform: translate(-50% -50%);
    color: var(--color-light);
    align-self: flex-start;
    padding: 6px;
  }

  &__skeleton {
    height: 36px;
  }
}
</style>
