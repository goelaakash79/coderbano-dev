const express = require("express");
const router = express.Router();

const { userAuth } = require("../../../middlewares/auth");
const { dashboard } = require("../../../controllers/users_controller");
const { catchErrors } = require("../../../config/errorHandler");

router.get("/dashboard", userAuth, catchErrors(dashboard));

module.exports = router;
