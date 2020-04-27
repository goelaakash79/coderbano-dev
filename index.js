const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const { notFound, sendErrors } = require("./config/errorHandler");
const app = express();

require("dotenv").config();
require("./config/dbconnection");

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(compression());
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
	bodyParser.urlencoded({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000
	})
);
app.use(
	bodyParser.json({
		limit: "50mb",
		extended: true,
		parameterLimit: 1000000
	})
);

// load schemas
const User = require("./models/User");
const Problem = require("./models/Problem");
const Statistics = require("./models/Statistics");
const Submissions = require("./models/Submissions");

// Routes
app.use("/api/v1/auth", require("./routes/api/v1/auth"));
app.use("/api/v1/users", require("./routes/api/v1/users"));

app.use("/test", require("./routes/api/v1/test"));

app.use("*", notFound);

//Error Handlers
app.use(sendErrors);

app.listen(process.env.PORT, err => {
	if (err) {
		console.log("Error in running server");
		return;
	}
	console.log(
		`Server is up and running on http://localhost:${process.env.PORT}`
	);
});
