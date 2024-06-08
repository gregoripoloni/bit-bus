<script setup>
	import { RouterLink } from 'vue-router'
	import Card from 'primevue/card'
	import Button from 'primevue/button'

	defineProps({
		id: Number,
		name: String,
		category: String,
		img: String
	})

	const emit = defineEmits(['editItem'])
</script>

<template>
	<Card class="CollectionItem">
		<template v-if="img" #header>
			<div class="CollectionItem-header">
				<img class="CollectionItem-image" :src="img" />
			</div>
		</template>
		<template #title>{{ name }}</template>
		<template #subtitle>{{ category }}</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<RouterLink :to="`/acervo/${id}`">
					<Button label="Ver" severity="secondary" />
				</RouterLink>
				<Button label="Editar" severity="secondary" @click="emit('editItem', id)" />
			</div>
		</template>
	</Card>
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
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}
</style>
