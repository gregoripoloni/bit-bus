import APIClient from "./APIClient";

class OpinionAPIClient extends APIClient {
	path = "/Opinion";

	async addOpinion(Opinion) {
		let result = await fetch(this.getURL(), {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(Opinion)
		});
		return await result.json();
	}

	async getAll(visitId) {
		let result = await fetch(this.getURL() + `/${visitId}`);
		return await result.json();
	}
}
export default OpinionAPIClient;