require("../db/moongose");

const User = require("../models/user");

module.exports = {
  async create(req, res) {
    const user = new User(req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  },

  async list(req, res) {
    res.send(req.user);
  },

  async logout(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();

      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },
  async logoutAll(req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  },

  async login(req, res) {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  },
  async delete(req, res) {
    try {
      req.user.remove();
      res.status(200).send(req.user);
    } catch (er) {
      res.status(500).send();
    }
  },
};
