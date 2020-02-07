import axios from "axios";
import { authLogin, authRegister, dashboard, ladderDetail } from "./Routes";
axios.defaults.baseURL = "http://localhost:5000/api/v1";
const AUTH_TOKEN = localStorage.getItem("token");
if (AUTH_TOKEN) {
	axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN;
}
export const loginService = async data => {
	try {
		const response = await axios.post(authLogin, data);
		return response.data;
	} catch (err) {
		console.log(err);
		return err.message;
	}
};

export const registerService = async data => {
	try {
		const response = await axios.post(authRegister, data);
		return response.data;
	} catch (err) {
		console.log(err);
		return err.message;
	}
};

export const dashboardService = async () => {
	try {
		const response = await axios.get(dashboard);
		if (response.data.message === "success") {
			return response.data.data;
		} else {
			console.log(response);
		}
	} catch (err) {
		console.log(err);
	}
};

export const ladderService = async params => {
	try {
		const response = await axios.get(ladderDetail, { params });
		if (response.data.message === "success") {
			return response.data.data;
		} else {
			console.log(response);
		}
	} catch (err) {
		console.log(err);
	}
};
