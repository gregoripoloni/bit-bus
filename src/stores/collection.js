import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

import CollectionAPIClient from '@/API/CollectionAPIClient'

export const useCollectionStore = defineStore('collection', () => {
	const APIClient = new CollectionAPIClient()

	const items = reactive({ data: [] })
	const item = reactive({ data: null })

	const loadingItems = ref(false)
	const loadingItem = ref(false)

	const getItems = async () => {
		loadingItems.value = true
		items.data = await APIClient.getAll()
		loadingItems.value = false
	}

	const addItem = async (item) => {
		await APIClient.save(item)
		getItems()
	}

	const updateItem = async (id, item) => {
		await APIClient.update({ id, ...item })
		getItem(id)
	}

	const getItem = async (id) => {
		loadingItem.value = true
		item.data = await APIClient.getById(id)
		loadingItem.value = false
	}

	const resetItem = () => {
		item.data = null
	}

	const removeItem = async (id) => {
		await APIClient.delete(id)
		getItems()
	}

	return { items, item, getItems, getItem, resetItem, addItem, updateItem, removeItem, loadingItems, loadingItem }
})
