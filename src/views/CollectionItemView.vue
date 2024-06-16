<script setup>
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { useCollectionStore } from '@/stores/collection'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import CollectionItemDetails from '@/components/CollectionItemDetails.vue'

	const route = useRoute()

	const { getItem } = useCollectionStore()

	const item = computed(() => {
		return route.params.id ? getItem(parseInt(route.params.id)) : undefined
	})

	const breadcrumbItems = computed(() => {
		return [
			{ label: 'Acervo', route: '/acervo' },
			{ label: item.value ? item.value.name : undefined }
		]
	})
</script>

<template>
	<div v-if="$route.params.id" class="flex flex-col gap-4">
		<PageBreadcrumb :items="breadcrumbItems" />
		<CollectionItemDetails :item />
	</div>
</template>
