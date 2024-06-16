<script setup>
	import { ref, computed } from 'vue'
	import Button from 'primevue/button'
	import Image from 'primevue/image'
	import Card from 'primevue/card'
	import Panel from 'primevue/panel'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionForm from '@/components/CollectionForm.vue'

	const props = defineProps({
		item: Object
	})

	const details = computed(() => {
		return [
			{ name: 'Tipo', value: props.item.type?.name },
			{ name: 'Classificação', value: props.item.classification?.name },
			{ name: 'Modelo', value: props.item.model },
			{ name: 'Fabricante', value: props.item.manufacturer },
			{ name: 'Ano', value: props.item.year },
			{ name: 'Quantidade', value: props.item.quantity },
			{ name: 'Dimensões', value: props.item.dimensions },
			{ name: 'Local de armazenamento', value: props.item.local },
			{ name: 'Nome do doador', value: props.item.donor }
		]
	})

	const toast = useToast()
	const { updateItem } = useCollectionStore()

	const formVisible = ref(false)

	const submitItem = (item) => {
		updateItem(props.item.id, item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item atualizado.', life: 3000 })
	}
</script>

<template>
	<Card #content>
		<div class="flex flex-col gap-8 p-4">
			<div>
				<h1 class="flex justify-between">
					{{ item.name }}
					<Button label="Editar" severity="secondary" @click="formVisible = true" />
				</h1>
				<p class="CollectionItemDetails-category">{{ item.category.name }}</p>
			</div>
			<div class="grid grid-cols-8 gap-8">
				<div class="col-span-6 grid grid-cols-4 gap-8 h-fit">
					<div v-for="detail in details.filter(detail => detail.value)" :key="detail.name" class="flex flex-col gap-1">
						<p class="CollectionItemDetails-label">{{ detail.name }}</p>
						<p>{{ detail.value }}</p>
					</div>
				</div>
				<Image v-if="item.img" class="col-span-2" preview>
					<template #indicatoricon>
						<i class="pi pi-search"></i>
					</template>
					<template #image>
						<img class="CollectionItemDetails-image" :src="item.img" />
					</template>
					<template #preview="slotProps">
						<img :src="item.img" alt="preview" :style="slotProps.style" />
					</template>
				</Image>
			</div>
			<Panel v-if="item.description" header="Descrição" toggleable>
				<p>{{ item.description }}</p>
			</Panel>
			<Panel v-if="item.links" header="Links" toggleable>
				<a :href="item.links">{{ item.links }}</a>
			</Panel>
		</div>
		<CollectionForm v-model:visible="formVisible" :id="item.id" @submitItem="submitItem" />
	</Card>
</template>

<style scoped>
	.CollectionItemDetails-image {
		border-radius: 8px;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.CollectionItemDetails-category {
		color: var(--text-color-secondary);
	}

	.CollectionItemDetails-label {
		font-weight: 500;
	}
</style>
