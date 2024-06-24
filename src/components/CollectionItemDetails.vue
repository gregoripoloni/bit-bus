<script setup>
	import { ref, computed } from 'vue'
	import { useRouter } from 'vue-router'
	import Button from 'primevue/button'
	import Image from 'primevue/image'
	import Card from 'primevue/card'
	import Panel from 'primevue/panel'
	import ConfirmDialog from 'primevue/confirmdialog'
	import { useToast } from 'primevue/usetoast'
	import { useConfirm } from 'primevue/useconfirm'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionForm from '@/components/CollectionForm.vue'

	const props = defineProps({
		item: Object
	})

	const router = useRouter()
	const toast = useToast()
	const confirm = useConfirm();
	const { updateItem, removeItem } = useCollectionStore()

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

	const formVisible = ref(false)

	const submitItem = async (item) => {
		await updateItem(props.item.id, item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item atualizado.', life: 3000 })
	}

	const deleteItem = () => {
		confirm.require({
			message: 'Quer mesmo remover este item do acervo?',
			header: 'Cuidado!',
			icon: 'pi pi-info-circle',
			rejectLabel: 'Cancelar',
			rejectClass: 'p-button-secondary p-button-outlined',
			acceptLabel: 'Remover',
			acceptClass: 'p-button-danger',
			accept: async () => {
				await removeItem(props.item.id)
				toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Item removido.', life: 3000 })
				router.push('/acervo')
			}
		})
	}
</script>

<template>
	<Card #content>
		<div class="flex flex-col gap-8 p-4">
			<div>
				<h1 class="flex justify-between">
					{{ item.name }}
					<div class="flex gap-3">
						<Button label="Editar" severity="secondary" outlined @click="formVisible = true" />
						<Button icon="pi pi-trash" severity="danger" outlined @click="deleteItem" />
					</div>
				</h1>
				<p class="CollectionItemDetails-category">{{ item.category.name }}</p>
			</div>
			<div class="grid grid-cols-8 gap-8">
				<Image v-if="item.img" class="col-span-2 CollectionItemDetails-imageContainer" preview>
					<template #image>
						<img class="CollectionItemDetails-image" :src="item.img" />
					</template>
					<template #preview="slotProps">
						<img :src="item.img" alt="preview" :style="slotProps.style" />
					</template>
				</Image>
				<Panel v-if="item.description" header="Descrição" class="col-span-6">
					<p>{{ item.description }}</p>
				</Panel>
			</div>
			<Panel header="Detalhes">
				<div class="grid grid-cols-4 gap-8">
					<div v-for="detail in details.filter(detail => detail.value)" :key="detail.name" class="flex flex-col gap-1">
						<p class="CollectionItemDetails-label">{{ detail.name }}</p>
						<p>{{ detail.value }}</p>
					</div>
				</div>
			</Panel>
			<Panel v-if="item.links" header="Links">
				<a :href="item.links">{{ item.links }}</a>
			</Panel>
		</div>
		<CollectionForm v-model:visible="formVisible" :id="item.id" @submitItem="submitItem" />
		<ConfirmDialog></ConfirmDialog>
	</Card>
</template>

<style scoped>
	.CollectionItemDetails-imageContainer {
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid var(--surface-border);
	}

	.CollectionItemDetails-image {
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
