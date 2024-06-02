<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import Button from 'primevue/button'
	import Breadcrumb from 'primevue/breadcrumb'
	import CollectionList from '@/components/CollectionList.vue'
	import CollectionForm from '@/components/CollectionForm.vue'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'

	const home = ref({
		icon: 'pi pi-home',
		route: '/'
	});
	
	const items = ref([
		{ label: 'Acervo' }
	])

	const visible = ref(false)

	const toast = useToast()
	const { addItem } = useCollectionStore()

	const submitItem = (item) => {
		addItem(item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item cadastrado no acervo.', life: 3000 })
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<Breadcrumb :home :model="items" #item="{ item }">
				<RouterLink v-if="item.route" :to="item.route">
					<span :class="[item.icon, 'text-primary']" />
					<span class="text-primary font-medium">{{ item.label }}</span>
				</RouterLink>
				<span v-else class="text-2xl font-semibold">{{ item.label }}</span>
			</Breadcrumb>
			<Button label="Incluir" icon="pi pi-plus" @click="visible = true" />
			<CollectionForm v-model:visible="visible" @submitItem="submitItem" />
		</div>
		<CollectionList />
	</div>
</template>
