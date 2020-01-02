const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: String,
    password: String
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

module.exports = User = mongoose.model("user", userSchema);
