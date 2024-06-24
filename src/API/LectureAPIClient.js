import APIClient from './APIClient'

class LectureAPIClient extends APIClient {
	path = '/Lecture'

	async getAll() {
		let result = await fetch(this.getURL())
		return await result.json()
	}

	async getById(id) {
		if (id === '0') {
			return {}
		}

		let result = await fetch(`${this.getURL()}/${id}`)
		return await result.json()
	}

	async save(item) {
		let result = await fetch(this.getURL(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		})
		return await result.json()
	}

	async update(item) {
		let result = await fetch(this.getURL(), {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(item)
		})
		return await result.json()
	}

	async delete(id) {
		await fetch(`${this.getURL()}/${id}`, {
			method: 'DELETE'
		})
	}
}

export default LectureAPIClient
