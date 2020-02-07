import axios from "axios";
import { authLogin, authRegister } from "./Routes";
axios.defaults.baseURL = "http://localhost:5000/api/v1";

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
