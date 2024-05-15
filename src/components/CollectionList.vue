<script setup>
	import CollectionItem from '@/components/CollectionItem.vue'
	import { useCollectionStore } from '@/stores/collection'

	const { items } = useCollectionStore()
</script>

<template>
	<div class="grid grid-cols-4 gap-4">
		<CollectionItem
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:name="item.name"
			:description="item.description"
			:img="item.img"
		/>
	</div>
</template>
