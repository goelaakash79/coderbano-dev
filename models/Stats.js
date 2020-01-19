const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		lastActivity: Date,
		most: {
			productiveDay: {
				type: String,
				default: "Insufficient data",
				enum: [
					"Insufficient data",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday",
					"Sunday"
				]
			},
			productiveTimeOfDay: {
				type: String,
				default: "Insufficient data",
				enum: [
					"Insufficient data",
					"Late nights", //12am- 3am 0
					"Early Mornings", //4am-7am 1
					"Mornings", //8am-11am 2
					"Noons", //12pm-3pm 3
					"Evenings", //4pm-8pm 4
					"Nights" //9pm-11pm 5
				]
			},
			usedLanguage: {
				type: String,
				default: "Insufficient data"
			}
		},
		ladderDetails: {
			"2, A": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, B": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, C": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, D": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, E": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"1, D": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"1, E": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"Rating less than 1300": {
				unlocked: { type: Boolean, default: false },
				problemsSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			}
		}
	},
	{ timestamps: true }
);

module.exports = Stats = mongoose.model("Stats", statsSchema);
