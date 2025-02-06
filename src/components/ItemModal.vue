<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useItemsStore, type IItem } from '../store/items'
import InventoryItem from './InventoryItem.vue'
import SkeletonLoading from './UI/SkeletonLoading.vue'
import Button from './UI/Button.vue'
import Input from './UI/Input.vue'
import SlideModal from './UI/SlideModal.vue'

interface IItemModalProps {
  item: IItem | null
  teleport: HTMLDivElement
}

interface IItemModalEmits {
  (n: 'close'): void
}

const props = defineProps<IItemModalProps>()
const emits = defineEmits<IItemModalEmits>()

const visible = defineModel<boolean>({ required: true })
const { deleteItem } = useItemsStore()

const isDeleting = ref(false)
const deletingCount = ref<number | null>(null)

const hasError = computed(() => {
  if (props.item?.quantity && deletingCount.value !== null) {
    return deletingCount.value > props.item?.quantity
  }
  return false
})

const handleClose = () => {
  emits('close')
  visible.value = false
  isDeleting.value = false
  deletingCount.value = null
}

const handleDelete = () => {
  if (props.item && deletingCount.value) {
    deleteItem(props.item.id, deletingCount.value)
    handleClose()
  }
}
</script>

<template>
  <SlideModal v-model="visible" :teleport="props.teleport" @close="handleClose">
    <template #default>
      <div v-if="props.item" class="item-modal flex flex-col align-center">
        <div class="item-modal__img">
          <InventoryItem :color="props.item.color" />
        </div>
        <div class="item-modal__info">
          <div class="item-modal__info-title">
            <SkeletonLoading type="block" />
          </div>
          <div class="item-modal__info-text">
            <SkeletonLoading
              type="text"
              :lines="5"
              :lines-widths="['100%', '100%', '100%', '85%', '50%']"
            />
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <div v-if="!isDeleting" class="item-modal__actions flex align-center">
        <Button
          class="item-modal__actions-btn_full"
          label="Удалить предмет"
          color="warn"
          @click="isDeleting = true"
        />
      </div>
      <div v-else class="item-modal__actions_upper flex align-center flex-wrap">
        <Input
          v-model="deletingCount"
          class="full-w"
          type="number"
          label="Введите количество"
          :error="hasError"
        />
        <Button class="flex-grow" label="Отмена" @click="isDeleting = false" />
        <Button
          class="flex-grow"
          label="Подтвердить"
          color="warn"
          :disabled="hasError"
          @click="handleDelete"
        />
      </div>
    </template>
  </SlideModal>
</template>

<style lang="scss" scoped>
$b: '.item-modal';

#{$b} {
  &__img {
    width: 130px;
    height: 130px;
    margin-top: 23px;
  }

  &__info {
    width: 100%;
    border-top: var(--border);
    padding-top: 16px;
    margin-top: 30px;

    &-title {
      height: 30px;
    }

    &-text {
      margin-top: 24px;
    }
  }

  &__actions {
    padding-top: 18px;
    width: 100%;
    border-top: var(--border);

    &_upper {
      padding-top: 20px;
      position: relative;
      column-gap: 10px;
      row-gap: 20px;
    }

    &-btn_full {
      --button-width: 100%;
    }
  }
}
</style>
