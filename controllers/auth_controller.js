require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
	let { handle, email, password } = req.body;
	let user = await User.findOne({ $or: [{ email }, { handle }] });
	if (user) {
		return res.status(406).json({
			message: "Email/Handle already in use",
			error: false,
			data: null
		});
	} else {
		let salt = await bcrypt.genSalt();
		password = await bcrypt.hash(password, salt);
		let newUser = { handle, password, email };
		await User.create(newUser);
		return res.status(200).json({
			message: "success",
			error: false,
			data: null
		});
	}
};

module.exports.login = async (req, res) => {
	let { handle, password } = req.body;

	let user = await User.findOne({ handle });
	if (user) {
		let isMatchPassword = await bcrypt.compare(password, user.password);
		if (isMatchPassword) {
			let token = user.generateAuthToken();
			return res
				.status(200)
				.header("x-auth-token", token)
				.json({
					message: "success",
					token,
					error: false,
					data: user
				});
		} else {
			return res.status(406).json({
				message: "invalid credentials",
				error: true,
				data: req.body
			});
		}
	} else {
		return res
			.status(406)
			.json({ message: "invalid user", error: true, data: null });
	}
};
