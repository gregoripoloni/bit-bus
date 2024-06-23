import APIClient from "./APIClient";

class DonationAPIClient extends APIClient {
	path = "/Donation";

	async addDonation(Opinion) {
		let result = await fetch(this.getURL(), {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(Opinion)
		});
		return await result.json();
	}

	async getAll() {
		let result = await fetch(this.getURL());
		return await result.json();
	}

	async delete(id) {
		await fetch(`${this.getURL()}/${id}`, {
			method: 'DELETE'
		})
	}
}
export default DonationAPIClient;