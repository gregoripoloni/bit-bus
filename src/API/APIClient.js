export default class APIClient {
	baseUrl = "https://localhost:32770/api"
	path = '';

	getURL () {
		return this.baseUrl + this.path;
	}
}