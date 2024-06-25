<script setup>
	import { computed, onActivated, onDeactivated } from 'vue'
	import { useRoute } from 'vue-router'
	import Skeleton from 'primevue/skeleton'
	import { useCollectionStore } from '@/stores/collection'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import CollectionItemDetails from '@/components/CollectionItemDetails.vue'

	const route = useRoute()
	const store = useCollectionStore()

	onActivated(() => {
		store.getItem(route.params.id)
	})

	onDeactivated(store.resetItem)

	const breadcrumbItems = computed(() => {
		return [
			{ label: 'Acervo', route: '/acervo' },
			{ label: store.item.data?.name }
		]
	})
</script>

<template>
	<div>
		<Transition name="fadeIn" mode="out-in">
			<div v-if="store.loadingItem" class="flex flex-col gap-4">
				<Skeleton borderRadius="12px" height="56px" width="240px" />
				<Skeleton borderRadius="12px" height="720px" />
			</div>
			<div v-else-if="store.item.data" class="flex flex-col gap-4">
				<PageBreadcrumb :items="breadcrumbItems" />
				<CollectionItemDetails :item="store.item.data" />
			</div>
		</Transition>
	</div>
</template>
