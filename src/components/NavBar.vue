<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import Menubar from 'primevue/menubar'

	const items = ref([
		{
			label: 'Início',
			url: '/',
			icon: 'pi pi-home'
		},
		{
				label: 'Acervo',
				url: '/acervo',
				icon: 'pi pi-objects-column'
		},
		{
				label: 'Visitas',
				url: '/visitas',
				icon: 'pi pi-map'
		},
		{
				label: 'Palestras',
				url: '/palestras',
				icon: 'pi pi-address-book'
		},
		{
				label: 'Doação',
				url: '/doacao',
				icon: 'pi pi-wallet'
		}
	])
</script>

<template>
	<nav class="NavBar">
		<Menubar class="NavBar-menuBar" :model="items">
				<template #item="{ item }">
					<RouterLink :to="item.url" class="NavBar-menuLink gap-2">
						<span :class="item.icon" />
						<span>{{ item.label }}</span>
					</RouterLink>
				</template>
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
		gap: 16px;
	}

	.NavBar-menuLink {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		color: var(--text-color);
		text-decoration: none;
		border-radius: 6px;
	}

	.NavBar-logo {
		display: flex;

		img {
			height: 40px;
			width: auto;
		}
	}
</style>
