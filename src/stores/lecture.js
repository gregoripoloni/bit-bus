import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

import LectureAPIClient from '@/API/LectureAPIClient'

export const useLectureStore = defineStore('lecture', () => {
	const APIClient = new LectureAPIClient()

	const lectures = reactive({ data: [] })
	const lecture = reactive({ data: null })

	const loadingLectures = ref(false)
	const loadingLecture = ref(false)

	const getLectures = async () => {
		loadingLectures.value = true
		lectures.data = await APIClient.getAll()
		loadingLectures.value = false
	}

	const addLecture = async (lecture) => {
		await APIClient.save(lecture)
		getLectures()
	}

	const updateLecture = async (id, lecture) => {
		await APIClient.update({ id, ...lecture })
		getLecture(id)
	}

	const getLecture = async (id) => {
		loadingLecture.value = true
		lecture.data = await APIClient.getById(id)
		loadingLecture.value = false
	}

	const resetLecture = () => {
		lecture.data = null
	}

	const removeLecture = async (id) => {
		await APIClient.delete(id)
		getLectures()
	}

	return { lectures, lecture, getLectures, getLecture, resetLecture, addLecture, updateLecture, removeLecture, loadingLectures, loadingLecture }
})
