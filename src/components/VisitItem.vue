<script setup>
	import Card from 'primevue/card'
	import Button from 'primevue/button'
	import { useRouter } from 'vue-router';

	const router = useRouter();

	defineProps({
		id: Number,
		place: String,
		period: String,
		responsable: String,
		totalVisitors: Number
	})

	const emit = defineEmits(['editItem', 'viewVisitors'])

	const openNewVisitWindow = (id) => {
		const routeData = router.resolve({name: 'visitar', query: {id: id}});
		window.open(routeData.href, '_blank');
	}
</script>

<template>
	<Card class="CollectionItem">
		<template #title>Visita em: {{ place }}</template>
		<template #content>
			<p class="m-0">Responsável: {{ responsable }}</p>
			<p class="m-0">Data: {{ period }}</p>
			<p class="m-0">Total de visitantes: {{ totalVisitors }}</p>
		</template>
		<template #footer>
			<div class="flex gap-3 mt-1">
				<Button label="Visitar" severity="secondary" @click="openNewVisitWindow(id)"/>
				<Button label="Editar" severity="secondary" @click="emit('editItem', id)"/>
			</div>
			<div class="flex gap-3 mt-1">
				<Button label="Visualizar Visitantes" severity="secondary" @click="emit('viewVisitors', id)"/>
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