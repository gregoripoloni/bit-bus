<script setup>
	import { ref, computed, toRaw } from 'vue'
	import Button from 'primevue/button'
	import InputText from 'primevue/inputtext'
	import MultiSelect from 'primevue/multiselect'
	import InputGroup from 'primevue/inputgroup'
	import InputGroupAddon from 'primevue/inputgroupaddon'
	import Skeleton from 'primevue/skeleton'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionItem from '@/components/CollectionItem.vue'
	import { categoriesModel } from '@/utils/models'

	const emit = defineEmits(['addItem'])

	const store = useCollectionStore()

	const categories = ref(categoriesModel)

	const nameFilter = ref('')
	const categoryFilter = ref([])

	const filteredItems = computed(() => {
		let filteredItems = store.items.data
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
			<Button label="Incluir" icon="pi pi-plus" outlined @click="emit('addItem')" class="shrink-0" />
		</div>
		<Transition name="fadeIn" mode="out-in">
			<div v-if="store.loadingItems" class="grid grid-cols-6 gap-4">
				<Skeleton v-for="i in 6" borderRadius="12px" height="370px" />
			</div>
			<div v-else class="grid grid-cols-6 gap-4">
				<CollectionItem
					v-for="item in filteredItems"
					:key="item.id"
					:id="item.id"
					:name="item.name"
					:category="item.category.name"
					:img="item.img"
				/>
			</div>
		</Transition>
	</div>
</template>
