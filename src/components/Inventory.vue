<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemsStore } from '../store/items.ts'
import type { IItem } from '../store/items.ts'
import InventoryItem from './InventoryItem.vue'
import ItemModal from './ItemModal.vue'

const inventorySize = ref({ width: 5, height: 5 })
const { setItemPosition } = useItemsStore()
const { itemsMap } = storeToRefs(useItemsStore())
const inventoryEl = ref(null)

const infoModal = ref(false)
const itemToShow = ref<IItem | null>(null)
const movingItemId = ref<string | null>(null)
const draggingItem = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const showItem = (item: IItem) => {
  infoModal.value = true
  itemToShow.value = item
}

const handleClose = () => {
  infoModal.value = false
  itemToShow.value = null
}

const itemSize = ref({ width: 0, height: 0 })

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !draggingItem.value) return
  if (draggingItem.value.style.opacity === '0') draggingItem.value.style.opacity = '0.8'
  draggingItem.value.style.left = `${event.clientX - itemSize.value.width / 2}px`
  draggingItem.value.style.top = `${event.clientY - itemSize.value.height / 2}px`
}

const onMouseUp = (row?: number, cell?: number) => {
  if (movingItemId.value && row && cell) {
    setItemPosition(movingItemId.value, row, cell)
  }

  document.body.style.cursor = ''

  isDragging.value = false
  movingItemId.value = null

  if (draggingItem.value) {
    draggingItem.value.remove()
    draggingItem.value = null
  }
}

const onMouseDown = (event: MouseEvent, item: IItem) => {
  movingItemId.value = item.id
  isDragging.value = true

  document.body.style.cursor = 'grabbing'

  const currentTarget = event.currentTarget as HTMLElement

  const clonedItem = currentTarget.cloneNode(true) as HTMLElement
  const rect = currentTarget.getBoundingClientRect()
  itemSize.value = { width: rect.width / 1.5, height: rect.height / 1.5 }

  clonedItem.style.width = `${itemSize.value.width}px`
  clonedItem.style.height = `${itemSize.value.height}px`
  clonedItem.style.zIndex = '1000'
  clonedItem.style.opacity = '0'
  clonedItem.style.left = `${event.clientX - itemSize.value.width / 2}px`
  clonedItem.style.top = `${event.clientY - itemSize.value.height / 2}px`
  clonedItem.classList.add('dragging-item')

  document.body.appendChild(clonedItem)
  draggingItem.value = clonedItem
}

onMounted(() => {
  document.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div ref="inventoryEl" class="inventory" @mouseleave="onMouseUp()" @click="handleClose">
    <div class="inventory__content">
      <div
        v-for="(row, rowIndex) in inventorySize.height"
        :key="rowIndex"
        class="inventory__row flex"
      >
        <div
          v-for="(cell, cellIndex) in inventorySize.width"
          :key="cellIndex"
          class="inventory__cell"
          @mouseup="onMouseUp(row, cell)"
        >
          <InventoryItem
            v-if="itemsMap[`${row}-${cell}`]"
            :key="itemsMap[`${row}-${cell}`].id"
            :color="itemsMap[`${row}-${cell}`].color"
            :quantity="itemsMap[`${row}-${cell}`].quantity"
            @mousedown.stop="
              (event) => !infoModal && onMouseDown(event, itemsMap[`${row}-${cell}`])
            "
            @click.stop="!itemToShow && showItem(itemsMap[`${row}-${cell}`])"
          />
        </div>
      </div>
    </div>
  </div>
  <ItemModal
    v-if="inventoryEl"
    v-model="infoModal"
    :item="itemToShow"
    :teleport="inventoryEl"
    @close="handleClose"
  />
</template>

<style lang="scss" scoped>
$b: '.inventory';

#{$b} {
  position: relative;
  width: fit-content;

  &__content {
    width: fit-content;
    border: var(--border);
    border-radius: var(--border-radius-large);
    background-color: var(--color-gray-1);
    overflow: hidden;
  }

  &__row {
    &:not(&:last-child) {
      border-bottom: var(--border);
    }

    & #{$b}__cell:not(&:last-child) {
      border-right: var(--border);
    }
  }

  &__cell {
    width: 100px;
    height: 100px;
    --inventory-item-padding: 25px;
  }
}

.dragging-item {
  position: absolute;
  pointer-events: none;
  transition: transform 0.1s linear;
  --item-counter-display: none;
}
</style>
