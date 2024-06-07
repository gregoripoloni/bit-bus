<script setup>
	import { useRoute } from 'vue-router'
	import { useCollectionStore } from '@/stores/collection'

	const route = useRoute()
	const { getItem } = useCollectionStore()

	const name = getItem(parseInt(route.params.id)).name
</script>

<template>
	{{ name }}
</template>
