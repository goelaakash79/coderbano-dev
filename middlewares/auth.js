const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).json({
			message: "Access denied. No Token provided",
			error: true,
			data: null
		});
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	req.user = decodePayload;
	return next();
};

module.exports.adminAuth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res.status(401).json({
			message: "Access denied. No Token provided",
			error: true,
			data: null
		});
	const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
	if (decodePayload.role === "admin") {
		req.user = decodePayload;
		return next();
	} else {
		return res
			.status(403)
			.json({ message: "forbidden", error: true, data: null });
	}
};
