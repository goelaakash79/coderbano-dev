import axios from "axios";

axios.defaults.baseURL = "https://coderbano-api.herokuapp.com/api/v1";

axios.interceptors.response.use(
	response => {
		if (response && response.data && response.data.status === "FAILED") {
			const error = new Error("API response FAILED");
			const request = response.config && response.config.data;
			const apiUrl = response.config && response.config.url;
			console.log(error, { response: response.data, request, apiUrl });
		}
		return response;
	},
	error => {
		const expectedError =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expectedError) {
			console.log(error, { response: error.response });
		}

		return Promise.reject(error);
	}
);

axios.interceptors.request.use(function (config) {
	config.baseURL = "https://coderbano-api.herokuapp.com/api/v1";
	return config;
});

function setUserToken(token) {
	axios.defaults.headers.common["x-auth-token"] = token;
}

export default {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	patch: axios.patch,
	setUserToken
};
