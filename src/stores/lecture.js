import { reactive } from 'vue'
import { defineStore } from 'pinia'

import LectureAPIClient from '@/API/LectureAPIClient'

export const useLectureStore = defineStore('lecture', () => {
	const APIClient = new LectureAPIClient()

	const lectures = reactive({ data: [] })
	const lecture = reactive({ data: null })

	const getLectures = async () => {
		lectures.data = await APIClient.getAll()
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
		lecture.data = await APIClient.getById(id)
	}

	const resetLecture = () => {
		lecture.data = null
	}

	const removeLecture = async (id) => {
		await APIClient.delete(id)
		getLectures()
	}

	return { lectures, lecture, getLectures, getLecture, resetLecture, addLecture, updateLecture, removeLecture }
})
