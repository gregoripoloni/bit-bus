export default class APIClient {
	baseUrl = "https://localhost:32768/api"
	path = '';

	getURL () {
		return this.baseUrl + this.path;
	}
}