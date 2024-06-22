import { getCategoryByName, getClassificationByCode } from "@/utils/models"

export const convertToApi = (item) => {
	return {
		code: item.name, // Mudar para name
		category: item.category.name, // Mudar para int
		// type: item.type ?? 0, // Adicionar
		classification: item.classification ?? 0,
		// model: item.model ?? '', // Adicionar
		manufacturer: item.manufacturer ?? '',
		year: item.year ?? 0,
		quantity: Number(item.quantity) ?? 0,
		information: item.description ?? '',
		// dimenstions: item.dimenstions, // Adicionar
		// height: 100, // Remover
		// width: 50, // Remover
		picture: item.img ? [
			item.img
		] : [],
		links: item.links ? [
			item.links
		] : [],
		storagePlace: item.local ?? '',
		donerName: item.donor ?? '',
		donationDate: new Date().toISOString().split('T')[0] // Remover
	}
}

export const convertToStore = (item) => {
	return {
		id: item.id,
		name: item.code,
		category: item.category ? getCategoryByName(item.category) : null,
		classification: item.classification ? getClassificationByCode(item.classification) : null,
		manufacturer: item.manufacturer,
		year: item.year,
		quantity: item.quantity,
		description: item.information,
		img: item.picture ? item.picture[0] : '',
		links: item.links ? item.links[0] : '',
		local: item.storagePlace,
		donor: item.donerName
	}
}
