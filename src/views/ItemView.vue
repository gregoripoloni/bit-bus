<script setup>
	import { ref, computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { useCollectionStore } from '@/stores/collection'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import ItemDetails from '@/components/ItemDetails.vue'

	const route = useRoute()

	const { getItem } = useCollectionStore()

	const item = computed(() => {
		return route.params.id ? getItem(parseInt(route.params.id)) : undefined
	})

	const breadcrumbItems = ref([
		{ label: 'Acervo', route: '/acervo' },
		{ label: item.value ? item.value.name : undefined }
	])
</script>

<template>
	<div v-if="$route.params.id">
		<PageBreadcrumb :items="breadcrumbItems" />
		<ItemDetails :item />
	</div>
</template>
