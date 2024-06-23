export const categoriesModel = [
	{ name: 'Processadores e Memórias', code: 1 },
	{ name: 'Periféricos e Discos Removíveis', code: 2 },
	{ name: 'Servidores (Tower/físico)', code: 3 },
	{ name: 'Placas', code: 4 },
	{ name: 'Telefone', code: 5 }
]

export const typesModel = [
	{ name: 'Mídia', code: 1 },
	{ name: 'Dispositivo', code: 2 },
	{ name: 'Protótipo', code: 3 },
	{ name: 'Mouse', code: 4 },
	{ name: 'Teclado', code: 5 },
	{ name: 'Dispositivo de Entrada', code: 6 },
	{ name: 'Dispositivo de Armazenamento', code: 7 },
	{ name: 'Dispositivo de Saída', code: 8 }
]

export const classificationsModel = [
	{ name: 'ATX', code: 1 },
	{ name: 'Micro-ATX', code: 2 },
	{ name: 'Mini-ATX', code: 3 }
]

export const getCategoryByName = (name) => {
	return categoriesModel.find(category => category.name == name)
}

export const getCategoryByCode = (code) => {
	return categoriesModel.find(category => category.code == code)
}

export const getClassificationByCode = (code) => {
	return classificationsModel.find(classification => classification.code == code)
}
