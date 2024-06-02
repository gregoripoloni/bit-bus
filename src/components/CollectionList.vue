<script setup>
	import { ref } from 'vue'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionItem from '@/components/CollectionItem.vue'
	import CollectionForm from '@/components/CollectionForm.vue'

	const toast = useToast()
	const { items, updateItem } = useCollectionStore()

	const editId = ref(null)
	const visible = ref(false)

	const editItem = (id) => {
		editId.value = id
		visible.value = true
	}
	
	const submitItem = (item) => {
		updateItem(editId.value, item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item atualizado.', life: 3000 })
	}
</script>

<template>
	<div class="grid grid-cols-4 gap-4">
		<CollectionItem
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:name="item.name"
			:description="item.description"
			:img="item.img"
			@editItem="editItem"
		/>
		<CollectionForm v-model:visible="visible" :id="editId" @submitItem="submitItem" />
	</div>
</template>
