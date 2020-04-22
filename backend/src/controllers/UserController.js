require("../db/moongose");

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  async create(req, res, next) {
    await User.create(req.body)
      .then((data) => {
        const token = jwt.sign({ payload: data.id }, "myscret", {
          expiresIn: 86400,
        });
        res.send({ user: data, token });
      })
      .catch(next);
  },
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) return res.status(404).send({ error: "User not found" });

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) return res.status(401).send({ error: "Senha inválida" });

      const token = jwt.sign({ payload: user._id }, "mysecret", {
        expiresIn: 86400,
      });
      res.send({ user, token });
    } catch (err) {
      res.send(error);
    }
  },
  async list(req, res, next) {
    await User.find({})
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  },
};
