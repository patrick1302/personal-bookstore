require("../db/moongose");
const Book = require("../models/Book");

module.exports = {
  async list(req, res, next) {
    await Book.find({})
      .then((book) => {
        res.send(book);
      })
      .catch(next);
  },
  async listOne(req, res, next) {
    const id = req.params.id;
    await Book.findById({ _id: id })
      .then((book) => {
        res.send(book);
      })
      .catch(next);
  },
  async create(req, res, next) {
    await Book.create(req.body)
      .then((book) => {
        res.status(201).send(book);
      })
      .catch(next);
  },
  async delete(req, res) {
    const id = req.params.id;
    try {
      await Book.findByIdAndDelete({ _id: id }).then((book) => {
        res.send(book);
      });
    } catch (err) {
      console.log("Erro ao deletar livro");
    }
  },
  async update(req, res) {
    const id = req.params.id;
    try {
      await Book.findByIdAndUpdate({ _id: id }, req.body).then((book) => {
        res.send(book);
      });
    } catch (err) {
      console.log("Erro ao atualizar as informações");
    }
  },
  async auth(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.body);
    next();
  },
};
