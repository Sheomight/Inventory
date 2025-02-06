<script lang="ts" setup>
interface IButtonProps {
  color?: 'default' | 'warn'
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<IButtonProps>(), {
  color: 'default',
  disabled: false
})
</script>

<template>
  <button
    class="button flex align-center justify-center clickable"
    :class="[
      `button_color-${props.color}`,
      {
        button_disabled: props.disabled
      }
    ]"
    :disabled="props.disabled"
  >
    <div v-if="props.label" class="button__label flex align-center text-semi-bold">
      <span>{{ props.label }}</span>
    </div>
  </button>
</template>

<style lang="scss" scoped>
$b: '.button';

#{$b} {
  height: fit-content;
  width: var(--button-width, fit-content);
  border-radius: var(--border-radius-default);
  padding-block: 8px;
  padding-inline: 15px;
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

  &:not(#{$b}_disabled):hover,
  &:not(#{$b}_disabled):active {
    opacity: 0.8;
  }

  &_disabled {
    opacity: 0.4;
  }
}
</style>
