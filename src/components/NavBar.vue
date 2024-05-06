<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import Menubar from 'primevue/menubar'

	const items = ref([
		{
				label: 'Acervo',
				url: '/'
		},
		{
				label: 'Visitas',
				url: '/visitas'
		},
		{
				label: 'Doação',
				url: '/doacao'
		}
	])
</script>

<template>
	<nav class="NavBar">
		<Menubar class="NavBar-menuBar" :model="items" #item="{ item }">
				<RouterLink :to="item.url" class="NavBar-menuLink">
					<span>{{ item.label }}</span>
				</RouterLink>
		</Menubar>
	</nav>
</template>

<style scoped>
	.NavBar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--surface-section);
		border-bottom: 2px solid var(--primary-color);
		z-index: 99;
	}

	.NavBar-menuBar {
		max-width: 1280px;
		margin: auto;
		border: none;
		border-radius: 0;
	}

	.NavBar-menuLink {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		color: var(--text-color);
		text-decoration: none;
	}
</style>