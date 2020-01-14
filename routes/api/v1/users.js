const express = require("express");
const router = express.Router();

const { userAuth } = require("../../../middlewares/auth");
const {
	dashboard,
	getLadder
} = require("../../../controllers/users_controller");
const { catchErrors } = require("../../../config/errorHandler");

router.get("/dashboard", userAuth, catchErrors(dashboard));
router.get("/getLadder", userAuth, catchErrors(getLadder));

module.exports = router;
