export default class APIError {
	static VALIDATION_ERROR = 400;
	errors = [];
	errorFields = [];

	setErrors(responseErrors) {
		this.errorFields = Object.keys(responseErrors);
		this.errors = responseErrors;
	}

	getError(field) {
		if (this.errorFields.find(f => f == field)) {
			return true;
		}
		return false;
	}
}