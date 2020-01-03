const express = require("express");
const router = express.Router();

const { auth } = require("../../../middlewares/auth");
const { test, rohan, anshul } = require("../../../controllers/test_controller");

router.get("/rohan", rohan);
router.get("/anshul", anshul);

module.exports = router;
