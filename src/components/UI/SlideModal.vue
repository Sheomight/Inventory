<script lang="ts" setup>
import Close from '../icons/Close.vue'

interface ISlideUpModalProps {
  zIndex?: number
  teleport: HTMLDivElement
}

interface ISlideUpModalEmits {
  (e: 'close'): void
}

const props = withDefaults(defineProps<ISlideUpModalProps>(), {
  zIndex: 1050
})

const emits = defineEmits<ISlideUpModalEmits>()

const visible = defineModel<boolean>({ required: true })

const close = () => {
  visible.value = false
  emits('close')
}
</script>

<template>
  <Teleport :to="props.teleport">
    <Transition name="modal-slide">
      <div
        v-if="visible"
        :style="{ zIndex: props.zIndex }"
        class="caf-slide-modal flex flex-col justify-center align-center overflow-hidden"
      >
        <div class="caf-slide-modal__wrapper flex flex-col p-20" @click.stop>
          <div
            class="caf-slide-modal__header pb-20 flex flex-shrink-0 align-center full-w overflow-hidden"
          >
            <div
              class="caf-slide-modal__close flex align-center flex-shrink-0 clickable"
              @click="close"
            >
              <Close />
            </div>
          </div>
          <div
            v-if="visible"
            class="caf-slide-modal__body flex flex-col overflow-y-auto overflow-x-hidden hide-scroll"
          >
            <slot />
          </div>
          <div
            v-if="visible"
            class="caf-slide-modal__actions flex overflow-y-auto overflow-x-hidden"
          >
            <slot name="actions" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
$b: '.caf-slide-modal';

#{$b} {
  width: fit-content;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 var(--border-radius-large) var(--border-radius-large) 0;
  border: var(--border);
  overflow: hidden;
  background-color: var(--bg-color-gray_pale);
  backdrop-filter: blur(16px);

  &__wrapper {
    width: 250px;
    height: 100%;
    padding-top: 32px;
    padding-bottom: 18px;
  }

  &__body {
    flex: 1;
    padding-inline: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  &__close {
    position: absolute;
    right: 8px;
    top: 8px;
    padding: 6px;
    color: var(--color-light);
  }

  &__actions {
    margin-top: auto;
    padding-inline: 15px;
  }
}

.modal-slide {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease-in-out;

    & #{$b}__wrapper {
      transition: transform 0.2s ease-in-out;
    }
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;

    & #{$b}__wrapper {
      transform: translateX(100%);
    }
  }
}
</style>
