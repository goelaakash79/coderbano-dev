const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
	{
		handle: { type: String, required: true },
		email: String,
		password: String,
		role: { type: String, default: "user" } //["user","admin"]
	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			id: this._id,
			handle: this.handle,
			email: this.email
		},
		process.env.JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model("user", userSchema);
