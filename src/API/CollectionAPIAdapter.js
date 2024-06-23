import { getCategoryByCode, getTypeByCode, getClassificationByCode } from "@/utils/models"

export const convertToApi = (item) => {
	return {
		id: item.id ?? null,
		name: item.name,
		category: item.category?.code ?? 0,
		// type: item.type?.code ?? 0,
		classification: item.classification?.code ?? 0,
		// model: item.model ?? '',
		manufacturer: item.manufacturer ?? '',
		year: item.year ?? 0,
		quantity: Number(item.quantity) ?? 0,
		information: item.description ?? '',
		dimensions: item.dimensions ?? '',
		picture: item.img ? [
			item.img
		] : [],
		links: item.links ? [
			item.links
		] : [],
		storagePlace: item.local ?? '',
		donerName: item.donor ?? ''
	}
}

export const convertToStore = (item) => {
	return {
		id: item.id,
		name: item.name,
		category: item.category ? getCategoryByCode(item.category) : null,
		// type: item.type ? getTypeByCode(item.type) : null,
		classification: item.classification ? getClassificationByCode(item.classification) : null,
		// model: item.model,
		manufacturer: item.manufacturer,
		dimenstions: item.dimenstions,
		year: item.year,
		quantity: item.quantity,
		description: item.information,
		dimensions: item.dimensions,
		img: item.picture ? item.picture[0] : '',
		links: item.links ? item.links[0] : '',
		local: item.storagePlace,
		donor: item.donerName
	}
}
