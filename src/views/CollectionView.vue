<script setup>
	import { ref, onActivated } from 'vue'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import CollectionList from '@/components/CollectionList.vue'
	import CollectionForm from '@/components/CollectionForm.vue'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'

	const toast = useToast()
	const { getItems, addItem } = useCollectionStore()

	onActivated(getItems)

	const breadcrumbItems = ref([
		{ label: 'Acervo' }
	])

	const visible = ref(false)

	const submitItem = async (item) => {
		await addItem(item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item cadastrado no acervo.', life: 3000 })
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<PageBreadcrumb :items="breadcrumbItems" />
		</div>
		<CollectionList @addItem="visible = true" />
		<CollectionForm v-model:visible="visible" @submitItem="submitItem" />
	</div>
</template>
