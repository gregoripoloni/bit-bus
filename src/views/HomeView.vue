<script setup>
	import { ref } from "vue";
	import TabMenu from 'primevue/tabmenu'
	import ItemsList from '../components/ItemsList.vue'

	const items = ref([
		{ label: 'Processadores e Memórias' },
		{ label: 'Periféricos e Discos Removíveis' },
		{ label: 'Servidores (Tower/físico)' },
		{ label: 'Placas' },
		{ label: 'Telefone' }
	]);
</script>

<template>
	<div class="flex flex-col gap-4">
		<h1>Acervo</h1>
		<TabMenu :model="items" />
		<ItemsList />
	</div>
</template>
