import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCollectionStore = defineStore('collection', () => {
	const items = reactive([])

	const addItem = (item) => {
		items.push(item)
	}

	return { items, addItem }
})
