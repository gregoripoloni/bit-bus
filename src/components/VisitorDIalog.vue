<script setup>
	import Dialog from 'primevue/dialog';
	import Card from 'primevue/card';
import { computed } from 'vue';

	const props = defineProps({
		visible: Boolean,
		visitors: Array
	});

	const emit = defineEmits(['update:visible']);

	const visibleModel = computed({
		get() {
			return props.visible
		},
		set(newValue) {
			return emit('update:visible', newValue)
		}
	});
</script>
<template>
	<Suspense>
		<Dialog v-model:visible="visibleModel" modal header="Visitantes" :style="{ width: '75rem' }">
			<div class="grid grid-cols-4 gap-4">
				<Card class="CollectionItem" v-for="visitor in visitors">
					<template #title>Nome: {{ visitor.name }}</template>
				</Card>
			</div>
		</Dialog>
	</Suspense>
</template>