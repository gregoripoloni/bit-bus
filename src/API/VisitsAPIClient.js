import APIClient from "./APIClient";

class VisitsAPIClient extends APIClient {
	path = "/Visit";

	async getAll(filter) {
		let processedFilter = '';
		for (let key in filter) {
			if (filter[key]) {
				processedFilter += key + "=" + encodeURIComponent(filter[key]) + '&';
			}
		}

		let result = await fetch(this.getURL() + `?${processedFilter}`);
		return await result.json();
	}

	async getById(id) {
		let result = await fetch(this.getURL() + `/${id}`);
		return await result.json();
	}

	async addVisitor(id, visitor) {
		let result = await fetch(this.getURL() + `/addvisitors/${id}`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(visitor)
		});
		return await result.text();
	}
}

export default VisitsAPIClient;