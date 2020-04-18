require("../db/moongose");
const Register = require("../models/register");
const bcrypt = require("bcrypt");

module.exports = {
  create(req, res, next) {
    bcrypt.hash(req.body.password, 8, async function (err, result) {
      await Register.create({
        name: req.body.name,
        email: req.body.email,
        password: result,
      })
        .then((register) => {
          res.send(register);
        })
        .catch(next);
    });
  },
  async list(req, res, next) {
    await Register.find({})
      .then((register) => {
        res.send(register);
      })
      .catch(next);
  },
};
