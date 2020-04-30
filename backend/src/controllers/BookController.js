require("../db/moongose");
const Book = require("../models/Book");

module.exports = {
  async list(req, res) {
    const match = {};
    const sort = {};

    if (req.query.acquired) {
      match.acquired = req.query.acquired === "true";
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    try {
      await req.user
        .populate({
          path: "books",
          match,
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort,
          },
        })
        .execPopulate();
      res.send(req.user.books);
    } catch (e) {
      res.status(500).send();
    }
  },
  async listOne(req, res) {
    const id = req.params.id;
    try {
      const book = await Book.findOne({ _id: id, owner: req.user._id });
      res.send(book);
    } catch (e) {
      res.status(500).send();
    }
  },
  async create(req, res) {
    try {
      const book = await Book.create({ ...req.body, owner: req.user._id });
      res.status(201).send(book);
    } catch (e) {
      res.status(500).send();
    }
  },
  async delete(req, res) {
    const id = req.params.id;

    try {
      const book = await Book.findOneAndDelete({
        _id: id,
        owner: req.user._id,
      });
      if (!book) {
        return res.status(404).send();
      }
      res.status(200).send(book);
    } catch (e) {
      res.status(500).send();
    }
  },
  async update(req, res) {
    const id = req.params.id;
    try {
      const book = await Book.findByIdAndUpdate(
        { _id: id, owner: req.user._id },
        req.body
      );
      if (!book) {
        return res.status(404).send();
      }
      res.status(200).send(book);
    } catch (e) {
      res.status(500).send();
    }
  },
};
