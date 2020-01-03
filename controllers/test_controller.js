require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");

module.exports.test = (req, res) => {
  let time = Number.parseInt(Date.now() / 1000);
  let contestId = 566;
  let random = Number.parseInt(Math.random(1) * 1000000);
  let endpoint = "contest.hacks";
  let text = `${random}/${endpoint}?apiKey=${process.env.CODEFORCES_KEY}&contestId=${contestId}&time=${time}#${process.env.CODEFORCES_SECRET}`;

  var sha = crypto.createHash("sha512").update(String(text));
  var result = sha.digest("hex");

  let baseurl = `https://codeforces.com/api/${endpoint}?apiKey=${process.env.CODEFORCES_KEY}&contestId=${contestId}&time=${time}`;
  let apiSig = `${random}${result}`;

  axios
    .get(`${baseurl}&apiSig=${apiSig}`)
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => console.log(err));
  return res.status(200).json({ message: "" });
};
