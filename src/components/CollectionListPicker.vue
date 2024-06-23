<script setup>
	import { ref, computed, toRaw, onMounted } from 'vue'
	import InputText from 'primevue/inputtext'
	import MultiSelect from 'primevue/multiselect'
	import InputGroup from 'primevue/inputgroup'
	import InputGroupAddon from 'primevue/inputgroupaddon'
	import { useCollectionStore } from '@/stores/collection'
	import CollectionItemPicker from '@/components/CollectionItemPicker.vue'
	import { categoriesModel } from '@/utils/models'

	const props = defineProps({
		selectedItems: Array
	});

	const { items } = useCollectionStore();
	const { getItems } = useCollectionStore();

	const categories = ref(categoriesModel);

	const nameFilter = ref('');
	const categoryFilter = ref([]);
	const emit = defineEmits(['updateItem']);

	onMounted(() => {
		getItems();
	})

	const filteredItems = computed(() => {
		
		let filteredItems = items.data;
		if (nameFilter.value) {
			filteredItems = filteredItems.filter(item => item.name.search(nameFilter.value) >= 0);
		}
		if (categoryFilter.value && categoryFilter.value.length) {
			filteredItems = filteredItems.filter(item => toRaw(categoryFilter.value).some(category => toRaw(category).code === item.category.code));
		}
		return filteredItems;
	});

	const updateItems = (item) => {
		emit('updateItem', item);
	}

	const isSelected = (id) => {
		if (!props.selectedItems) return false;

		return props.selectedItems.find((i) => i.id == id) != undefined;
	}
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
		</div>
		<div class="grid grid-cols-6 gap-4">
			<CollectionItemPicker
				v-for="item in filteredItems"
				:key="item.id"
				:id="item.id"
				:name="item.name"
				:category="item.category.name"
				:img="item.img"
				:selected="isSelected(item.id)"
				:item="item"
				@setItem="(item) => updateItems(item)"
			/>
		</div>
	</div>
</template>
