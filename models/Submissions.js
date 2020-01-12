const mongoose = require("mongoose");

const submissionsSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		problem: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Problem",
			required: true
		},
		status: {
			type: String,
			default: "attempted",
			enum: ["attempted", "solved"]
		},
		lastAttemptTime: Date,
		attempts: Number,
		language: String,
		verdict: String
	},
	{ timestamps: true }
);

module.exports = Submissions = mongoose.model("Submissions", submissionsSchema);
