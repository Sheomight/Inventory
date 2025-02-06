import { defineStore } from 'pinia'
import useUUID from '../composables/useUUID'
import { computed, ref } from 'vue'

export interface IItem {
  id: string
  color: 'blue' | 'green' | 'yellow'
  quantity: number
  position: {
    row: number
    cell: number
  }
}

export const useItemsStore = defineStore('items', () => {
  const { getUUID } = useUUID()

  const itemsFromStorage = ref(localStorage.getItem('items'))

  const defaultItems = ref<Array<IItem>>([
    {
      id: getUUID(),
      color: 'blue',
      quantity: 1,
      position: {
        row: 1,
        cell: 1
      }
    },
    {
      id: getUUID(),
      color: 'green',
      quantity: 4,
      position: {
        row: 1,
        cell: 2
      }
    },
    {
      id: getUUID(),
      color: 'yellow',
      quantity: 2,
      position: {
        row: 1,
        cell: 3
      }
    },
    {
      id: getUUID(),
      color: 'green',
      quantity: 11,
      position: {
        row: 1,
        cell: 4
      }
    }
  ])

  const getItems = computed<Array<IItem>>(() => {
    if (itemsFromStorage.value === null) {
      localStorage.setItem('items', JSON.stringify(defaultItems.value))
      itemsFromStorage.value = localStorage.getItem('items')
    }

    return JSON.parse(itemsFromStorage.value ?? '[]')
  })

  const itemsMap = computed(() => {
    const map: Record<string, IItem> = {}
    getItems.value.forEach((item) => {
      const key = `${item.position.row}-${item.position.cell}`
      map[key] = item
    })
    return map
  })

  return {
    defaultItems,
    getItems,
    itemsMap
  }
})
