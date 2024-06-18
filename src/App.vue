<script setup>
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
	<Toast />
	<NavBar />
	<main>
		<RouterView v-slot="{ Component }">
			<KeepAlive>
				<Component :is="Component" />
			</KeepAlive>
		</RouterView>
	</main>
</template>

<style scoped>
	main {
		padding: 56px 0;
	}
</style>
