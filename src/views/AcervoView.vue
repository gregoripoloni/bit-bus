<script setup>
	import { ref } from 'vue'
	import { RouterLink } from 'vue-router'
	import Button from 'primevue/button'
	import Breadcrumb from 'primevue/breadcrumb'
	import CollectionList from '@/components/CollectionList.vue'
	import FormDialog from '@/components/FormDialog.vue'

	const home = ref({
		icon: 'pi pi-home',
		route: '/'
	});
	
	const items = ref([
		{ label: 'Acervo' }
	])

	const visible = ref(false)
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<Breadcrumb :home :model="items" #item="{ item }">
				<RouterLink v-if="item.route" :to="item.route">
					<span :class="[item.icon, 'text-primary']" />
					<span class="text-primary font-medium">{{ item.label }}</span>
				</RouterLink>
				<span v-else class="text-2xl font-semibold">{{ item.label }}</span>
			</Breadcrumb>
			<Button label="Incluir" icon="pi pi-plus" @click="visible = true" />
			<FormDialog v-model:visible="visible" />
		</div>
		<CollectionList />
	</div>
</template>
