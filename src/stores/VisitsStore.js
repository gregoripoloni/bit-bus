import { reactive } from 'vue';
import { defineStore } from "pinia";
import VisitsAPIClient from '@/API/VisitsAPIClient';
import APIStatusErrors from '@/API/APIError';
import APIError from '@/API/APIError';

export const useVisitStore = defineStore('visits', () => {
	let visits = reactive([]);
	let cachedVisits = reactive([]);
	let lastRequestErrors = reactive([]);
	const apiClient = new VisitsAPIClient();

	const getAllVisits = async (filter) => {
		cachedVisits = await apiClient.getAll(filter);
		return cachedVisits;
	}

	const getById = async (id) => {
		if (cachedVisits.length > 0) {
			let visits = cachedVisits.filter(vis => vis.id === id);
			if (visits.length > 0) {
				return visits[0];
			}
		}

		visits = await apiClient.getById(id);
		return visits;
	}

	const save = async (visit) => {
		let result = await apiClient.save(visit);

		if (result.status === APIError.VALIDATION_ERROR && result.errors) {
			lastRequestErrors = result.errors;
			let apiError = new APIError();
			apiError.setErrors(lastRequestErrors);
			return apiError;
		}

		return result;
	}

	const update = async (visit) => {
		let result = await apiClient.update(visit);

		if (result.status === APIError.VALIDATION_ERROR && result.errors) {
			lastRequestErrors = result.errors;
			let apiError = new APIError();
			apiError.setErrors(lastRequestErrors);
			return apiError;
		}

		return result;
	}

	return { getAllVisits, getById, save, update };
});