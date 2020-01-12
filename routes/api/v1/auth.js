const express = require("express");
const router = express.Router();

const { login, register } = require("../../../controllers/auth_controller");
const {
	registerValidator
} = require("../../../middlewares/validations/auth_validation");
const { catchErrors } = require("../../../config/errorHandler");

router.post("/login", catchErrors(login));
router.post("/register", registerValidator, catchErrors(register));

module.exports = router;
