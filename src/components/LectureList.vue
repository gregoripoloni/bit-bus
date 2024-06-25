<script setup>
	import Button from 'primevue/button'
	import Skeleton from 'primevue/skeleton'
	import LectureItem from '@/components/LectureItem.vue'
	import { useLectureStore } from '@/stores/lecture'

	const emit = defineEmits(['addItem'])

	const store = useLectureStore()
</script>

<template>
	<div class="flex flex-col gap-8">
		<div class="flex justify-end items-center gap-4">
			<Button label="Incluir" icon="pi pi-plus" outlined @click="emit('addItem')" class="shrink-0" />
		</div>
		<Transition name="fadeIn" mode="out-in">
			<div v-if="store.loadingLectures" class="grid grid-cols-6 gap-4">
				<Skeleton v-for="i in 6" borderRadius="12px" height="208px" />
			</div>
			<div v-else class="grid grid-cols-6 gap-4">
				<LectureItem
					v-for="lecture in store.lectures.data"
					:key="lecture.id"
					:id="lecture.id"
					:title="lecture.title"
					:person="lecture.person"
					:local="lecture.local"
					:datetime="lecture.datetime"
				/>
			</div>
		</Transition>
	</div>
</template>
