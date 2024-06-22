import APIClient from './APIClient'
import { convertToApi, convertToStore } from './CollectionAPIAdapter'

class CollectionAPIClient extends APIClient {
	path = '/Acervo'

	async getAll() {
		let result = await fetch(this.getURL())
		result = await result.json()
		return result.map(item => convertToStore(item))
	}

	async getById(id) {
		if (id === '0') {
			return {}
		}

		let result = await fetch(`${this.getURL()}/${id}`)
		result = await result.json()
		return convertToStore(result)
	}

	async save(item) {
		let result = await fetch(this.getURL(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(convertToApi(item))
		})
		return await result.json()
	}

	async update(item) {
		let result = await fetch(this.getURL(), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: item.id, ...convertToApi(item) })
		})
		return await result.json()
	}

	async delete(id) {
		await fetch(`${this.getURL()}/${id}`, {
			method: 'DELETE'
		})
	}
}

export default CollectionAPIClient
