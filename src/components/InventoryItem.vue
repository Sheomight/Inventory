<script lang="ts" setup>
interface IInventoryItemProps {
  color: 'yellow' | 'blue' | 'green'
  quantity?: number
}

const props = defineProps<IInventoryItemProps>()
</script>

<template>
  <div
    class="inventory-item flex align-center justify-center full-w full-h clickable"
    :class="[`inventory-item_${props.color}`]"
  >
    <div class="inventory-item__image full-w full-h" />
    <div v-if="props.quantity" class="inventory-item__counter">{{ props.quantity }}</div>
  </div>
</template>

<style lang="scss" scoped>
$b: '.inventory-item';

#{$b} {
  position: relative;
  padding: var(--inventory-item-padding, 0);

  &__image {
    position: relative;

    &::before {
      position: absolute;
      content: '';
      width: 88.89%;
      height: 88.89%;
      bottom: 0;
      translate: 0 0;
      backdrop-filter: blur(12px);
    }

    &::after {
      position: absolute;
      content: '';
      width: 88.89%;
      height: 88.89%;
      bottom: 0;
      translate: 6px -6px;
      backdrop-filter: blur(12px);
    }
  }

  &_green {
    & #{$b}__image::before {
      background-color: var(--color-green);
    }

    & #{$b}__image::after {
      background-color: var(--color-green_pale);
    }
  }

  &_blue {
    & #{$b}__image::before {
      background-color: var(--color-blue);
    }

    & #{$b}__image::after {
      background-color: var(--color-blue_pale);
    }
  }

  &_yellow {
    & #{$b}__image::before {
      background-color: var(--color-yellow);
    }

    & #{$b}__image::after {
      background-color: var(--color-yellow_pale);
    }
  }

  &__counter {
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 16px;
    height: 16px;
    border-left: var(--border);
    border-top: var(--border);
    border-radius: var(--border-radius-default) 0 0 0;
    font-size: 10px;
    padding-inline: 4px;
    padding-block: 2px;
    text-align: center;
  }
}
</style>
