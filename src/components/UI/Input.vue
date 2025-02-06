<script lang="ts" setup>
import { computed, ref } from 'vue'

interface IInputProps {
  label?: string
  error?: boolean
  required?: boolean
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  placeholder: ''
})

const model = defineModel({ required: true })
const inputEl = ref<HTMLInputElement | null>(null)

const inputFocused = ref(false)

const isActive = computed(() => inputFocused.value || model.value)

const getCustomClasses = computed(() => ({
  input_error: props.error,
  input_focused: isActive.value,
  'input_without-label': !props.label,
  input_filled: model.value
}))

const onFocus = () => {
  inputFocused.value = true
}

const onBlur = () => {
  inputFocused.value = false
}
</script>

<template>
  <div class="input full-w" :class="[getCustomClasses]">
    <div v-if="props.label" class="input__label absolute text-secondary" @click="inputEl?.focus()">
      <span>{{ props.label }}</span>
    </div>
    <input
      ref="inputEl"
      v-model.trim="model"
      class="input__field full-w"
      :type="props.type"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.input {
  position: relative;

  &__label {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }

  &__field {
    border: var(--border);
    border-radius: var(--border-radius-small);
    padding: 11px;

    &:focus {
      border: 1px solid var(--color-light);
    }
  }

  &_focused,
  &_filled {
    .input__label {
      visibility: hidden;
    }
  }

  &_error {
    .input__field,
    .input__field:focus {
      border: 1px solid var(--color-warn);
    }
  }
}
</style>
