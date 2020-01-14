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
					"Early Mornings",
					"Late nights",
					"Evenings",
					"Mornings",
					"Nights"
				]
			},
			usedLanguage: {
				type: String,
				default: "Insufficient data"
			}
		},
		submissions: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Submissions",
					required: true
				}
			}
		],
		laddersDetails: {
			"2, A": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, B": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, C": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, D": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"2, E": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"1, D": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"1, E": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			},
			"Rating less than 1300": {
				unlocked: { type: Boolean, default: false },
				problemSolved: { type: Number, default: 0 },
				lastActivity: { type: Date }
			}
		}
	},
	{ timestamps: true }
);

module.exports = Stats = mongoose.model("Stats", statsSchema);
