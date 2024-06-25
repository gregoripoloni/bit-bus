<script setup>
	import { computed, onActivated, onDeactivated } from 'vue'
	import { useRoute } from 'vue-router'
	import Skeleton from 'primevue/skeleton'
	import { useLectureStore } from '@/stores/lecture'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import LectureDetails from '@/components/LectureDetails.vue'

	const route = useRoute()
	const store = useLectureStore()

	onActivated(() => {
		store.getLecture(route.params.id)
	})

	onDeactivated(store.resetLecture)

	const breadcrumbItems = computed(() => {
		return [
			{ label: 'Palestras', route: '/palestras' },
			{ label: store.lecture.data?.title }
		]
	})
</script>

<template>
	<div>
		<Transition name="fadeIn" mode="out-in">
			<div v-if="store.loadingLecture" class="flex flex-col gap-4">
				<Skeleton borderRadius="12px" height="56px" width="240px" />
				<Skeleton borderRadius="12px" height="400px" />
			</div>
			<div v-else-if="store.lecture.data" class="flex flex-col gap-4">
				<PageBreadcrumb :items="breadcrumbItems" />
				<LectureDetails :lecture="store.lecture.data" />
			</div>
		</Transition>
	</div>
</template>
