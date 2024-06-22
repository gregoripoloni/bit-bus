<script setup>
	import { computed, onActivated, onDeactivated } from 'vue'
	import { useRoute } from 'vue-router'
	import { useCollectionStore } from '@/stores/collection'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import CollectionItemDetails from '@/components/CollectionItemDetails.vue'

	const route = useRoute()
	const { item, getItem, resetItem } = useCollectionStore()

	onActivated(() => {
		getItem(route.params.id)
	})

	onDeactivated(resetItem)

	const breadcrumbItems = computed(() => {
		return [
			{ label: 'Acervo', route: '/acervo' },
			{ label: item.data?.name }
		]
	})
</script>

<template>
	<div v-if="item.data" class="flex flex-col gap-4">
		<PageBreadcrumb :items="breadcrumbItems" />
		<CollectionItemDetails :item="item.data" />
	</div>
</template>
