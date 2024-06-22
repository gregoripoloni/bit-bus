import { reactive } from 'vue'
import { defineStore } from 'pinia'

import CollectionAPIClient from '@/API/CollectionAPIClient'

export const useCollectionStore = defineStore('collection', () => {
	const APIClient = new CollectionAPIClient()

	const items = reactive({ data: [] })
	const item = reactive({ data: null })

	const getItems = async () => {
		items.data = await APIClient.getAll()
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
		item.data = await APIClient.getById(id)
	}

	const resetItem = () => {
		item.data = null
	}

	const removeItem = async (id) => {
		await APIClient.delete(id)
		getItems()
	}

	return { items, item, getItems, getItem, resetItem, addItem, updateItem, removeItem }
})
