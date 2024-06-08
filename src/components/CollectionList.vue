<script setup>
	import { ref, computed, toRaw } from 'vue'
	import Button from 'primevue/button'
	import InputText from 'primevue/inputtext'
	import MultiSelect from 'primevue/multiselect'
	import InputGroup from 'primevue/inputgroup'
	import InputGroupAddon from 'primevue/inputgroupaddon'
	import { useToast } from 'primevue/usetoast'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionItem from '@/components/CollectionItem.vue'
	import CollectionForm from '@/components/CollectionForm.vue'

	const emit = defineEmits(['addItem'])

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

	const categories = ref([
		{ name: 'Processadores e Memórias', code: 1 },
		{ name: 'Periféricos e Discos Removíveis', code: 2 },
		{ name: 'Servidores (Tower/físico)', code: 3 },
		{ name: 'Placas', code: 4 },
		{ name: 'Telefone', code: 5 }
	])

	const nameFilter = ref('')
	const categoryFilter = ref([])

	const filteredItems = computed(() => {
		let filteredItems = items
		if (nameFilter.value) {
			filteredItems = filteredItems.filter(item => item.name.search(nameFilter.value) >= 0)
		}
		if (categoryFilter.value && categoryFilter.value.length) {
			filteredItems = filteredItems.filter(item => toRaw(categoryFilter.value).some(category => toRaw(category).code === item.category.code))
		}
		return filteredItems
	})
</script>

<template>
	<div class="flex flex-col gap-8">
		<div class="flex justify-between items-center gap-4">
			<div class="grid grid-cols-4 gap-4 w-full">
				<InputGroup class="w-full">
					<InputGroupAddon>
						<i class="pi pi-filter"></i>
					</InputGroupAddon>
					<InputText v-model="nameFilter" placeholder="Nome" />
				</InputGroup>
				<InputGroup class="w-full">
					<InputGroupAddon>
						<i class="pi pi-filter"></i>
					</InputGroupAddon>
					<MultiSelect
						v-model="categoryFilter" 
						:options="categories" 
						optionLabel="name" 
						placeholder="Categoria" 
						:showToggleAll="false" 
						:maxSelectedLabels="1" 
						selectedItemsLabel="{0} categorias selecionadas"
					/>
				</InputGroup>
			</div>
			<Button label="Incluir" icon="pi pi-plus" @click="emit('addItem')" class="shrink-0" />
		</div>
		<div class="grid grid-cols-6 gap-4">
			<CollectionItem
				v-for="item in filteredItems"
				:key="item.id"
				:id="item.id"
				:name="item.name"
				:category="item.category.name"
				:img="item.img"
				@editItem="editItem"
			/>
			<CollectionForm v-model:visible="visible" :id="editId" @submitItem="submitItem" />
		</div>
	</div>
</template>
