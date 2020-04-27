import http from "./httpService";
import { LOGIN, REGISTER } from "../Routes";

const isLoggedIn = () => {
	const userToken = localStorage.getItem("token");
	if (userToken) {
		http.setUserToken(userToken);
		return userToken;
	} else {
		return false;
	}
};

const loginService = async data => {
	const response = await http.post(LOGIN, data).catch(error => {
		if (error.response) {
			return error.response;
		}
	});
	if (response.status === 200) {
		localStorage.setItem("token", response.data.token);
	}
	return response.data;
};

const registerService = async data => {
	const response = await http.post(REGISTER, data).catch(error => {
		if (error.response) {
			return error.response;
		}
	});
	// if (response.status === 200) {
	// 	localStorage.setItem("token", response.data.token);
	// }
	return response.data;
};

const logout = () => {
	localStorage.clear();
	window.location.push("/login");
};

export { loginService, logout, isLoggedIn, registerService };
