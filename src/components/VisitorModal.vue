<script setup>
	import Dialog from 'primevue/dialog';
	import { computed } from 'vue';
	import DataTable from 'primevue/datatable';
	import Column from 'primevue/column';

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
			<div class="grid grid-cols-1">
				<DataTable :value="visitors" showGridlines  tableStyle="min-width: 100%">
					<Column field="name" header="Name"></Column>
					<Column field="email" header="email"></Column>
				</DataTable>
			</div>
		</Dialog>
	</Suspense>
</template>