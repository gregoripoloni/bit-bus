import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', () => {
	const currentId = ref(0)
	const items = reactive([])

	const addItem = (item) => {
		items.push({ id: currentId.value, ...item })
		currentId.value++
	}

	const updateItem = (id, item) => {
		const index = items.findIndex(i => i.id === id)
		items[index] = { id: id, ...item }
	}

	const getItem = (id) => {
		return items.find(item => item.id === id)
	}

	return { items, addItem, updateItem, getItem }
})
