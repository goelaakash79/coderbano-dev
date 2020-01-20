const { divs } = require("../../config/helpers");

module.exports.ladderDetailsValidator = (req, res, next) => {
	const { div } = req.query;

	if (!div || !divs.includes(div)) {
		return res.status(400).json({
			message: "Query parameter not provided or is incorrect",
			error: true,
			data: div
		});
	} else {
		return next();
	}
};

module.exports.stalkHandleValidator = (req, res, next) => {
	const { handle } = req.query;

	if (!handle) {
		return res.status(400).json({
			message: "Incorrect/no handle provided",
			error: true,
			data: handle
		});
	} else {
		return next();
	}
};
