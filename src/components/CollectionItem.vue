<script setup>
	import { ref } from 'vue'
	import Card from 'primevue/card'
	import Button from 'primevue/button'
	import FormDialog from './FormDialog.vue'
	import { useCollectionStore } from '@/stores/collection'

	const props = defineProps({
		id: Number,
		name: String,
		description: String,
		img: String
	})

	const visible = ref(false)

	const { getItem, updateItem } = useCollectionStore()
	let item = getItem(props.id)
	
	const submitItem = (i) => {
		updateItem(props.id, i)
		item = getItem(props.id)
	}
</script>

<template>
	<Card class="CollectionItem">
		<template v-if="img" #header>
			<div class="CollectionItem-header">
				<img class="CollectionItem-image" :src="img" />
			</div>
		</template>
		<template #title>{{ name }}</template>
		<template #content>
			<p class="m-0">{{ description }}</p>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Visitar" severity="secondary" />
				<Button label="Editar" severity="secondary" @click="visible = true" />
			</div>
		</template>
	</Card>
	<FormDialog v-model:visible="visible" :item @submitItem="submitItem" />
</template>

<style scoped>
	.CollectionItem {
		overflow: hidden;
	}

	.CollectionItem-header {
		padding: 24px 24px 0 24px;
	}

	.CollectionItem-image {
		border-radius: 8px;
		width: 50%;
	}
</style>
