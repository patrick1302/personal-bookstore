require("../db/moongose");

const User = require("../models/user");
const sharp = require("sharp");

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
  async getAvatar(req, res) {
    try {
      const user = await User.findById(req.user._id);

      if (!user || !user.avatar) {
        throw new Error();
      }

      res.set("Content-Type", "image/png");
      res.send(user.avatar);
    } catch (e) {
      res.status(404).send();
    }
  },
  async upload(req, res) {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  async handleErrorUpload(error, req, res, next) {
    res.status(400).send({ error: error.message });
  },
  async deleteAvatar(req, res) {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
};
