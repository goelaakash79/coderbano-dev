module.exports.ladderDetailsValidator = (req, res, next) => {
	const possibleDivs = [
		"2, A",
		"2, B",
		"2, C",
		"2, D",
		"2, E",
		"1, D",
		"1, E",
		"Rating less than 1300"
	];
	const { div } = req.query;

	if (!div || !possibleDivs.includes(div)) {
		return res.status(400).json({
			message: "Query parameter not provided or is incorrect",
			error: true,
			data: null
		});
	} else {
		return next();
	}
};
