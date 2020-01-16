const express = require("express");
const router = express.Router();

const { userAuth } = require("../../../middlewares/auth");
const {
	ladderDetailsValidator
} = require("../../../middlewares/validations/user_validations");
const {
	dashboard,
	getLadder
} = require("../../../controllers/users_controller");
const { catchErrors } = require("../../../config/errorHandler");

router.get("/dashboard", userAuth, catchErrors(dashboard));
router.get(
	"/getLadder",
	userAuth,
	ladderDetailsValidator,
	catchErrors(getLadder)
);

module.exports = router;
