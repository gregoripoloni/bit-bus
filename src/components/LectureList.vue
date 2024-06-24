<script setup>
	import Button from 'primevue/button'
	import LectureItem from '@/components/LectureItem.vue'
	import { useLectureStore } from '@/stores/lecture'

	const emit = defineEmits(['addItem'])

	const { lectures } = useLectureStore()
</script>

<template>
	<div class="flex flex-col gap-8">
		<div class="flex justify-end items-center gap-4">
			<Button label="Incluir" icon="pi pi-plus" outlined @click="emit('addItem')" class="shrink-0" />
		</div>
		<div class="grid grid-cols-6 gap-4">
			<LectureItem
				v-for="lecture in lectures.data"
				:key="lecture.id"
				:id="lecture.id"
				:title="lecture.title"
				:person="lecture.person"
				:local="lecture.local"
				:datetime="lecture.datetime"
			/>
		</div>
	</div>
</template>
