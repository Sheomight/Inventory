<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemsStore } from '../store/items.ts'
import type { IItem } from '../store/items.ts'
import InventoryItem from './InventoryItem.vue'
import ItemModal from './ItemModal.vue'

const inventorySize = ref({ width: 5, height: 5 })
const { itemsMap } = storeToRefs(useItemsStore())
const inventoryEl = ref(null)

const infoModal = ref(false)
const itemToShow = ref<IItem | null>(null)

const showItem = (item: IItem) => {
  infoModal.value = true
  itemToShow.value = item
}
</script>

<template>
  <div ref="inventoryEl" class="inventory">
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
        >
          <InventoryItem
            v-if="itemsMap[`${row}-${cell}`]"
            :key="itemsMap[`${row}-${cell}`].id"
            :color="itemsMap[`${row}-${cell}`].color"
            :quantity="itemsMap[`${row}-${cell}`].quantity"
            @click="!itemToShow && showItem(itemsMap[`${row}-${cell}`])"
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
    @close="itemToShow = null"
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
</style>
