//instead of using try{} catch(e){} everywhere for async functions we wrap them in a higher order function which catches the error and passes along to next middleware

const log4js = require("log4js");
log4js.configure({
	appenders: { cheese: { type: "file", filename: "server-logs.log" } },
	categories: { default: { appenders: ["cheese"], level: "error" } }
});
let logger = log4js.getLogger();
logger.level = "debug";

//catchErrors is a function that takes any middleware which a route executes
module.exports.catchErrors = middlewareFunction => {
	//catchErrors return the middlewareFunction wrapped inside an anonymous function
	return async (req, res, next) => {
		//calling the passed middleware function
		//if there is an error then it catches it and passes on next()
		//using try and catch because if middleware function is synchronous then .catch() is undefined
		try {
			await middlewareFunction(req, res, next);
		} catch (err) {
			//log the error
			logger = log4js.getLogger("Logs from catchErrors middleware");
			logger.error(err);
			//pass this error for display
			next(err);
		}
	};
};

// not found routes
module.exports.notFound = (req, res) => {
	logger = log4js.getLogger("Wrong endpoint request");
	logger.info(`${req.path} has been hit`);
	res.status(404).json({
		message: "welcome to the coderbano api! this endpoint is null"
	});
};

module.exports.sendErrors = (err, req, res, next) => {
	const errorDetailsToSend = {
		message: err.message,
		status: err.status || 500,
		error: true
	};
	//logging error for backend console
	console.log(errorDetailsToSend);
	console.log(err.stack);
	//sending error to frontend
	logger = log4js.getLogger("Logs from sendErrors middleware");
	logger.error(errorDetailsToSend)
	res.status(err.status || 500).json(errorDetailsToSend);
};
