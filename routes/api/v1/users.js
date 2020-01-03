const express = require("express");
const router = express.Router();

const {auth} = require("../../../middlewares/auth");
const authController = require("../../../controllers/auth_controller");

router.get("/", authController.index);

module.exports = router;
