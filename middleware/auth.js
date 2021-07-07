const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../model/People");
async function auth(req, res, next) {
  let token = Object.values(req.cookies)[0]; //gets token value from cookie

  if (!token) return res.status(400).send("Token not found");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user._id);
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
  next();
}

module.exports = auth;
