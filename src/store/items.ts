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

const STORAGE_KEY = 'items'

export const useItemsStore = defineStore('items', () => {
  const { getUUID } = useUUID()

  const itemsFromStorage = ref<IItem[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

  const defaultItems: IItem[] = [
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
  ]

  if (!itemsFromStorage.value.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems))
    itemsFromStorage.value = defaultItems
  }

  const getItems = computed<IItem[]>(() => itemsFromStorage.value)

  const itemsMap = computed(() => {
    const map: Record<string, IItem> = {}
    getItems.value.forEach((item) => {
      const key = `${item?.position.row}-${item?.position.cell}`
      map[key] = item
    })
    return map
  })

  const setItems = (items: IItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    itemsFromStorage.value = items
  }

  const deleteItem = (itemId: string, quantity: number | null) => {
    const updatedItems = getItems.value
      .map((item) => {
        if (item.id === itemId && quantity !== null) {
          item.quantity -= quantity
        }
        return item
      })
      .filter((item) => item.quantity > 0)

    setItems(updatedItems)
  }

  const setItemPosition = (itemId: string, row: number, cell: number) => {
    const key = `${row}-${cell}`
    if (!itemsMap.value[key]) {
      const updatedItems = getItems.value.map((item) =>
        item.id === itemId ? { ...item, position: { row, cell } } : item
      )
      setItems(updatedItems)
    }
  }

  return {
    itemsMap,
    deleteItem,
    setItemPosition
  }
})
