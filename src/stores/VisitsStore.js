import { reactive } from 'vue';
import { defineStore } from "pinia";
import VisitsAPIClient from '@/API/VisitsAPIClient';

export const useVisitStore = defineStore('visits', () => {
	let visits = reactive([]);
	const apiClient = new VisitsAPIClient();

	const getAllVisits = async (filter) => {
		visits = await apiClient.getAll(filter);
		return visits;
	}

	const getById = async (id) => {
		visits = await apiClient.getById(id);
		return visits;
	}

	return { getAllVisits, getById };
});