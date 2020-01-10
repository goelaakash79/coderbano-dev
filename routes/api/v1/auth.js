const express = require("express");
const router = express.Router();

const { login, register } = require("../../../controllers/auth_controller");
const { catchErrors } = require("../../../config/errorHandler");

router.get("/login", catchErrors(login));
router.get("/register", catchErrors(register));

module.exports = router;
