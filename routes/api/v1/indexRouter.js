const express = require("express");
const router = express.Router();

const {
	compileProgram,
	runProgram
} = require("../../../controllers/index_controller");

// const { auth } = require("../../middlewares/auth");

router.post("/compile", compileProgram);
router.post("/run", runProgram);

module.exports = router;
