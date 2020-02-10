import axios from "axios";
import { authLogin, authRegister, dashboard, ladderDetail } from "./Routes";
// axios.defaults.baseURL = "https://coderbano.tech/api/v1/";
axios.defaults.baseURL = "http://localhost:5000/api/v1/";

export const loginService = async data => {
	try {
		const response = await axios.post(authLogin, data);
		return response.data;
	} catch (err) {
		// console.log(err.response);
		return err.response.data;
	}
};

export const registerService = async data => {
	try {
		const response = await axios.post(authRegister, data);
		return response.data;
	} catch (err) {
		// console.log(err.response);
		return err.response.data;
	}
};

export const dashboardService = async () => {
	try {
		let AUTH_TOKEN = localStorage.getItem("token");
		if (AUTH_TOKEN) {
			const response = await axios.get(dashboard, {
				headers: { "x-auth-token": AUTH_TOKEN }
			});
			if (response.data.message === "success") {
				return response.data.data;
			} else {
				console.log(response);
			}
		}
	} catch (err) {
		console.log(err.response);
		return err.response.data;
	}
};

export const ladderService = async params => {
	try {
		let AUTH_TOKEN = localStorage.getItem("token");
		if (AUTH_TOKEN) {
			const response = await axios.get(ladderDetail, {
				headers: { "x-auth-token": AUTH_TOKEN },
				params
			});
			if (response.data.message === "success") {
				return response.data.data;
			} else {
				console.log(response);
			}
		}
	} catch (err) {
		console.log(err.response);
		return err.response.data;
	}
};
