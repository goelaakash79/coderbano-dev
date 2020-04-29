import { DASHBOARD, LADDER_DETAIL, RUN, COMPILE } from "../Routes";
import { isLoggedIn } from "./authService";

import http from "../services/httpService";

export const dashboardService = async () => {
	const isOkay = isLoggedIn();
	if (isOkay) {
		try {
			const response = await http.get(DASHBOARD);
			if (response.status === 200 && response.data.error === false) {
				return response.data;
			} else return response.data;
		} catch (err) {
			return err.response.data;
		}
	} else {
		window.location.push("/login");
	}
};

export const ladderService = async params => {
	const isOkay = isLoggedIn();
	if (isOkay) {
		try {
			const response = await http.get(LADDER_DETAIL, {
				params
			});
			if (response.status === 200 && response.data.error === false) {
				return response.data;
			} else return response.data;
		} catch (err) {
			return err.response.data;
		}
	} else {
		window.location.push("/login");
	}
};

export const runProgramService = async ({ source }) => {
	const isOkay = isLoggedIn();
	if (isOkay) {
		try {
			const response = await http.post(RUN, { source });
			return response.data;
		} catch (err) {
			console.log(err.response);
			return err.response.data;
		}
	} else {
		window.location.push("/login");
	}
};

export const compileProgramService = async ({ source }) => {
	try {
		const response = await http.post(COMPILE, { source });
		return response.data;
	} catch (err) {
		console.log(err.response);
		return err.response.data;
	}
};
