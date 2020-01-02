const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.teacherAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      message: "Access denied. No Token provided",
      error: true,
      data: null
    });
  const decodePayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  req.user = decodePayload;
  return next();
};
