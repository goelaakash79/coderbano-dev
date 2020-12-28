require("dotenv").config();
// const axios = require("axios");
let hackerEarth = require("hackerearth-node"); //require the Library

hackerEarth = new hackerEarth(
	process.env.HACKEREARTH_CLIENT_SECRET //Your Client Secret Key here this is mandatory
	// "" //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);

module.exports.compileProgram = async (req, res) => {
	try {
		let config = {};
		config.time_limit = 1; //your time limit in integer
		config.memory_limit = 323244; //your memory limit in integer
		config.source = req.body.source; //your source code for which you want to use hackerEarth api
		config.input = ""; //input against which you have to test your source code

		config.language = "JAVASCRIPT_NODE"; //optional choose any one of them or none

		let result;
		result = await hackerEarth.compile(config);
		// result = {
		// 	async: 0,
		// 	compile_status: "OK",
		// 	id: "391a8dz",
		// 	code_id: "391a8dz"
		// };
		return res.status(200).json({
			message: "success",
			result: JSON.parse(result),
			error: false
		});
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ message: err.message, error: true, data: null });
	}
};

module.exports.runProgram = async (req, res) => {
	try {
		let config = {};
		config.time_limit = 1; //your time limit in integer
		config.memory_limit = 323244; //your memory limit in integer
		config.source = req.body.source; //your source code for which you want to use hackerEarth api
		config.input = ""; //input against which you have to test your source code

		config.language = "JAVASCRIPT_NODE"; //optional choose any one of them or none

		let result;
		result = await hackerEarth.run(config);
		// result = {
		// 	run_status: {
		// 		memory_used: "64",
		// 		time_limit: 1,
		// 		output_html: "12<br>",
		// 		memory_limit: 262144,
		// 		time_used: "0.101539",
		// 		signal: "OTHER",
		// 		exit_code: "0",
		// 		status_detail: "NA",
		// 		status: "AC",
		// 		stderr: "",
		// 		output: "12\n",
		// 		async: 0,
		// 		request_NOT_OK_reason: "",
		// 		request_OK: "True"
		// 	},
		// 	compile_status: "OK",
		// 	code_id: "9b8d6bI"
		// };
		return res.status(200).json({
			message: "success",
			result: JSON.parse(result),
			error: false
		});
	} catch (err) {
		console.log(err);
		return res
			.status(400)
			.json({ message: err.message, error: true, data: null });
	}
};
