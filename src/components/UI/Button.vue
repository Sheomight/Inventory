<script lang="ts" setup>
interface IButtonProps {
  color?: 'default' | 'warn'
  label?: string
}

const props = withDefaults(defineProps<IButtonProps>(), {
  color: 'default'
})
</script>

<template>
    <button
    class="button flex align-center justify-center clickable"
    :class="[
      `button_color-${props.color}`,
    ]"
  >
      <div
        v-if="props.label"
        class="button__label flex align-center text-semi-bold"
      >
        <span>{{ props.label }}</span>
      </div>
  </button>
</template>

<style lang="scss" scoped>
$b: '.button';

#{$b} {
  height: fit-content;
  width: var(--button-width, fit-content);
  border-radius: 8px;
  padding-block: 8px;
  padding-inline: 28px;
  font-family: var(--font-secondary);
  font-size: 14px;
  line-height: 130%;

  &_color-default {
    color: var(--color-gray-2);
    background: var(--color-light);
  }

  &_color-warn {
    color: var(--color-light);
    background: var(--color-warn);
  }
}
</style>
