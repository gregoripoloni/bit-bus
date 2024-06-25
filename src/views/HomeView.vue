<script setup>
	import { reactive } from 'vue'
	import { RouterLink } from 'vue-router'
	import Card from 'primevue/card'

	const items = reactive([
		{
				label: 'Acervo',
				url: '/acervo',
				icon: 'pi pi-objects-column',
				description: 'Veja os itens que possuímos em nosso acervo!'
		},
		{
				label: 'Visitas',
				url: '/visitas',
				icon: 'pi pi-map',
				description: 'Consulte as visitas que serão realizadas.'
		},
		{
				label: 'Doação',
				url: '/doacao',
				icon: 'pi pi-wallet',
				description: 'Faça uma doação para ajudar o nosso projeto!'
		},
		{
				label: 'Palestras',
				url: '/palestras',
				icon: 'pi pi-address-book',
				description: 'Consulte as palestras que serão realizadas.'
		}
	])
</script>

<template>
	<div class="flex flex-col gap-16 items-center justify-center">
		<div class="HomeView-welcome">
			<img class="HomeView-logo" src="../assets/logo.png" />
		</div>
		<div class="grid grid-cols-2 gap-8 w-full">
			<RouterLink v-for="item in items" :key="item.label" :to="item.url">
				<Card class="HomeView-cardLink">
					<template #title>
						<div class="flex justify-between">
							<div class="flex items-center gap-2">
								<span class="HomeView-icon" :class="item.icon"/>
								{{ item.label }}
							</div>
							<span class="HomeView-icon pi pi-arrow-right"/>
						</div>
					</template>
					<template #content>
						<p>{{ item.description }}</p>
					</template>
				</Card>
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
	.HomeView-welcome {
		width: 80%;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: url(../assets/background.png);
		background-position: center;
		border-radius: 12px;
	}

	.HomeView-logo {
		height: 80%;
		width: auto;
	}

	.HomeView-cardLink {
		box-shadow: none;
		border: 1px solid var(--surface-border);
		transition: background-color .2s;
	}

	.HomeView-cardLink:hover {
		background-color: var(--surface-hover);
	}

	.HomeView-icon {
		color: var(--primary-color);
	}
</style>
