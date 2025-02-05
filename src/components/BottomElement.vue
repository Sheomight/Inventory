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
  padding: 8px;
  border: var(--border);
  background-color: var(--color-gray-1);
  border-radius: var(--border-radius-large);

  &__content {
    flex-grow: 1;
    padding-block: 10px;
    padding-left: 10px;
  }

  &__close-btn {
    flex-shrink: 0;
    color: var(--color-light);
    align-self: flex-start;
    margin-left: 36px;
    padding: 6px;
  }

  &__skeleton {
    height: 36px;
  }
}
</style>
