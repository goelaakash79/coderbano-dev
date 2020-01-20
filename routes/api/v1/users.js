const express = require("express");
const router = express.Router();

const { userAuth } = require("../../../middlewares/auth");
const {
	ladderDetailsValidator,
	stalkHandleValidator
} = require("../../../middlewares/validations/user_validations");
const {
	dashboard,
	getLadder,
	stalkFriend
} = require("../../../controllers/users_controller");
const { catchErrors } = require("../../../config/errorHandler");

router.get("/dashboard", userAuth, catchErrors(dashboard));
router.get(
	"/getLadder",
	userAuth,
	ladderDetailsValidator,
	catchErrors(getLadder)
);
router.get("/stalk", userAuth, stalkHandleValidator, catchErrors(stalkFriend));
module.exports = router;
