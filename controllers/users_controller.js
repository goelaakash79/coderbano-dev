require("dotenv").config();
const axios = require("axios");

module.exports.dashboard = async (req, res) => {
	let stats = await Stats.findOne({ user: req.user.id });
	if (!stats) {
		//create prelim stats for new users
		let newStats = {
			user: req.user.id,
			lastActivity: new Date(Date.now()).toISOString()
		};
		stats = await Stats.create(newStats);
	}
	res.json({ stats });
};
