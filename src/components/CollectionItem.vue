<script setup>
	import Card from 'primevue/card'
	import Button from 'primevue/button'

	const props = defineProps({
		id: Number,
		name: String,
		description: String,
		img: String
	})
</script>

<template>
	<Card class="CollectionItem">
		<template v-if="img" #header>
			<div class="CollectionItem-header">
				<img class="CollectionItem-image" :src="`data:image/png;base64, ${img}`" />
			</div>
		</template>
		<template #title>{{ name }}</template>
		<template #content>
			<p class="m-0">{{ description }}</p>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Visitar" severity="secondary" />
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
		width: 50%;
	}
</style>
