<script setup>
	import { ref, onActivated } from 'vue'
	import PageBreadcrumb from '@/components/PageBreadcrumb.vue'
	import LectureList from '@/components/LectureList.vue'
	import LectureForm from '@/components/LectureForm.vue'
	import { useToast } from 'primevue/usetoast'
	import { useLectureStore } from '@/stores/lecture'

	const toast = useToast()
	const { getLectures, addLecture } = useLectureStore()

	onActivated(getLectures)

	const breadcrumbItems = ref([
		{ label: 'Palestras' }
	])

	const visible = ref(false)

	const submitItem = async (item) => {
		await addLecture(item)
		toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Palestra cadastrada.', life: 3000 })
	}
</script>

<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-between items-center">
			<PageBreadcrumb :items="breadcrumbItems" />
		</div>
		<LectureList @addItem="visible = true" />
		<LectureForm v-model:visible="visible" @submitItem="submitItem" />
	</div>
</template>
