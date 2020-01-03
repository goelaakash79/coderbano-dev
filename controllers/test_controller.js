require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");

module.exports.test = (req, res) => {
  let time = Number.parseInt(Date.now() / 1000);
  let contestId = 566;
  let random = Number.parseInt(Math.random(1) * 1000000);
  let endpoint = "contest.hacks";
  let text = `${random}/${endpoint}?apiKey=${process.env.CODEFORCES_KEY}&contestId=${contestId}&time=${time}#${process.env.CODEFORCES_SECRET}`;

  let sha = crypto.createHash("sha512").update(String(text));
  let result = sha.digest("hex");

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

module.exports.rohan = async (req, res) => {
    const {data} = await axios.get("https://codeforces.com/api/user.status?handle=rhnmht30&from=1&count=10");
    // console.log(data);
    res.json({data})
}   

module.exports.anshul = async (req, res) => {
    const {data} = await axios.get("https://codeforces.com/api/user.status?handle=Anshul1507&from=1&count=10");
    // console.log(data);
    res.json({data})
}   