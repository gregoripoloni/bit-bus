<script setup>
	import { RouterLink } from 'vue-router'
	import Card from 'primevue/card'
	import Button from 'primevue/button'

	defineProps({
		id: String,
		title: String,
		person: String,
		local: String,
		datetime: String
	})
</script>

<template>
	<Card class="LectureItem">
		<template #title>{{ title }}</template>
		<template #subtitle>{{ person }}<br/>{{ local }} - {{ datetime }}</template>
		<template #footer>
			<div class="flex mt-1">
				<RouterLink :to="`/palestras/${id}`">
					<Button label="Ver" severity="secondary" outlined />
				</RouterLink>
			</div>
		</template>
	</Card>
</template>

<style scoped>
	.LectureItem {
		overflow: hidden;
	}
</style>
