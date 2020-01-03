require("dotenv").config();

module.exports.index = (req, res) => {
  return res.status(200).json({ message: "" });
};
