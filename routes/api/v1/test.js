const express = require("express");
const router = express.Router();

const { auth } = require("../../../middlewares/auth");
const { test } = require("../../../controllers/test_controller");

router.get("/", test);

module.exports = router;
