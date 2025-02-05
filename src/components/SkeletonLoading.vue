<script setup lang="ts">
import { computed } from 'vue';

interface ISkeletonLoadingProps {
  type: 'text' | 'block'
  lines?: number
}

const props = defineProps<ISkeletonLoadingProps>();

const lines = computed(() => props.lines || 1)
</script>

<template>
  <div
    class="skeleton"
    :class="[`skeleton_${props.type}`]"
  >
    <template v-if="type === 'text'">
      <div
        v-for="(_, index) in lines"
        :key="index"
        class="skeleton__line"
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

  &_text {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  &_block {
    background: var(--skeleton-gradient);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
  }

  &__line {
    background: var(--skeleton-gradient);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
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