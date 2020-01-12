const axios = require("axios");
const isValidPassword = pwd => {
	// const regexPassword = new RegExp(
	//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
	// );
	return pwd.length >= 8;
};

module.exports.registerValidator = async (req, res, next) => {
	const { handle, email, password } = req.body;
	if (!handle || !email || !password) {
		return res.status(400).json({
			message: "All fields are mandatory",
			error: true,
			data: null
		});
	}

	//validating email
	let regexEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let isValidEmail = regexEmail.test(
		String(email)
			.toLowerCase()
			.trim()
	);

	if (!isValidEmail) {
		return res
			.status(406)
			.json({ error: true, message: "Invalid Email", data: req.body });
	} else if (!isValidPassword(String(password))) {
		return res.status(406).json({
			error: true,
			message: "Password should be more than 8 characters",
			data: req.body
		});
	} else {
		let api;
		try {
			api = await axios.get(
				`https://codeforces.com/api/user.info?handles=${handle}`
			);
		} catch (err) {
			api = err.response;
		}
		if (api.data.status !== "OK") {
			return res.status(406).json({
				message: "Invalid Codeforces handle",
				error: true,
				data: api.data
			});
		} else {
			return next();
		}
	}
};
