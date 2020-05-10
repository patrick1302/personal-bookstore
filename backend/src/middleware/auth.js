const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async auth(req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer", "").trim();
      const decoded = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      if (!user) {
        throw new Error();
      }
      req.token = token;
      req.user = user;

      next();
    } catch (e) {
      res.status(401).send("Please authenticate");
    }
  },
};
