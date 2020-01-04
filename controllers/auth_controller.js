require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports.index = (req, res) => {
  return res.status(200).json({ message: "" });
};

module.exports.register = async (req, res) => {
  let { username, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(200)
      .json({ message: "user already exists", error: false, data: null });
  } else {
    try {
      let salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);
      let newUser = { username, password, email };
      await User.create(newUser);
      return res
        .status(200)
        .json({ message: "user created", error: false, data: null });
    } catch (err) {
      return res
        .status(400)
        .json({ message: err.message, error: true, data: null });
    }
  }
}

module.exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      let isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        let token = user.generateAuthToken();
        return res
          .status(200)
          .header("x-auth-token", token)
          .json({ message: "success", error: false, data: { user, token } });
      } else {
        return res
          .status(200)
          .json({
            message: "invalid credentials",
            error: true,
            data: req.body
          });
      }
    } else {
      return res
        .status(200)
        .json({ message: "invalid user", error: true, data: null });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message, error: true, data: null });
  }
};