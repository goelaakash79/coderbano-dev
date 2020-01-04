const express = require("express");
const router = express.Router();

const { auth } = require("../../../middlewares/auth");
const { login, register } = require("../../../controllers/auth_controller");

router.get("/login", login);
router.get("/register", register);

module.exports = router;
