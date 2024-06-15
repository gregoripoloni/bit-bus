const { default: APIClient } = require("./APIClient");

class OpinionAPIClient extends APIClient {
	path = "/Opinion";

	async addOpinion(visitor) {
		let result = await fetch(this.getURL() + `/`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(visitor)
		});
		return await result.json();
	}
}