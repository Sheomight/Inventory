<script setup lang="ts">
import { computed } from 'vue';

interface ISkeletonLoadingProps {
  type: 'text' | 'block'
  lines?: number
  blockRounding?: 'default' | 'large'
}

const props = withDefaults(defineProps<ISkeletonLoadingProps>(), {
  blockRounding: 'default'
});

const lines = computed(() => props.lines || 1)
</script>

<template>
  <div
    class="skeleton"
    :class="[`skeleton_${props.type}`, `skeleton_${props.blockRounding}`]"
  >
    <template v-if="type === 'text'">
      <div
        v-for="(_, index) in lines"
        :key="index"
        class="skeleton__line flex flex-col"
      ></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
$b: '.skeleton';

#{$b} {
  overflow: hidden;
  width: 100%;
  height: 100%;

  &_default#{$b}_block {
    border-radius: 8px;
  }

  &_large#{$b}_block {
    border-radius: 12px;
  }

  &_text {
    row-gap: 16px;
  }

  &_block {
    background: var(--skeleton-gradient);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  &__line {
    background: var(--skeleton-gradient);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
    border-radius: 4px;
    width: 100%;
    height: 10px;
  }
}


@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>