<script setup>
	import Card from 'primevue/card'
	import Checkbox from 'primevue/checkbox'
	import { computed, onMounted, onUpdated, ref } from 'vue';

	const props = defineProps({
		id: String,
		name: String,
		category: String,
		img: String,
		selected: Boolean,
		item: Object
	});

	const selectedModel = computed({
		get() {
			return props.selected
		},
		set(newValue) {
			emit('setItem', props.item)
		}
	});


	const emit = defineEmits(['setItem']);
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
			<div class="flex mt-1 w-100 justify-between">
				<div class="justify-self-end self-center">
					<Checkbox v-model="selectedModel" binary/>
				</div>
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
