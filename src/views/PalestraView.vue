<script setup>
	import { computed, onActivated, onDeactivated } from 'vue'
	import { useRoute } from 'vue-router'
	import { useLectureStore } from '@/stores/lecture'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import LectureDetails from '@/components/LectureDetails.vue'

	const route = useRoute()
	const { lecture, getLecture, resetLecture } = useLectureStore()

	onActivated(() => {
		getLecture(route.params.id)
	})

	onDeactivated(resetLecture)

	const breadcrumbItems = computed(() => {
		return [
			{ label: 'Palestras', route: '/palestras' },
			{ label: lecture.data?.title }
		]
	})
</script>

<template>
	<div v-if="lecture.data" class="flex flex-col gap-4">
		<PageBreadcrumb :items="breadcrumbItems" />
		<LectureDetails :lecture="lecture.data" />
	</div>
</template>
