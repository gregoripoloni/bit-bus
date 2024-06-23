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
		<Dialog v-model:visible="visibleModel" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" modal header="Visitantes" :style="{ width: '75rem' }">
			<div class="grid grid-cols-1">
				<DataTable :value="visitors" showGridlines  tableStyle="min-width: 100%">
					<Column field="name" header="Name"></Column>
					<Column field="email" header="E-mail"></Column>
					<Column field="opinion.comment" header="Comentário" style="max-width: 25vw; text-wrap: wrap; word-break: break-word"></Column>
					<Column field="opinion.socialMedia" header="Link de Rede social"></Column>
				</DataTable>
			</div>
		</Dialog>
	</Suspense>
</template>