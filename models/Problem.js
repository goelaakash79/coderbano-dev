const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
	div: String,
	id: Number,
	name: String,
	link: String,
	judge: String,
	level: Number
});

module.exports = Problem = mongoose.model("Problem", problemSchema);
