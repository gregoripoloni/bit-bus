<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import Breadcrumb from 'primevue/breadcrumb'

	const props = defineProps({
		items: Array
	})

	const home = ref({
		icon: 'pi pi-home',
		route: '/'
	});
</script>

<template>
	<Breadcrumb :home :model="items" #item="{ item }">
		<RouterLink v-if="item.route" :to="item.route">
			<span v-if="item.icon" :class="[item.icon, 'text-primary']" />
			<span v-if="item.label" class="text-primary font-medium">{{ item.label }}</span>
		</RouterLink>
		<span v-else class="text-2xl font-semibold">{{ item.label }}</span>
	</Breadcrumb>
</template>
