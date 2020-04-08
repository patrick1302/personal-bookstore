require("../db/moongose");
const Book = require("../models/Book");

module.exports = {
  async list(req, res, next) {
    await Book.find({})
      .then(book => {
        res.send(book);
      })
      .catch(next);
  },
  async create(req, res, next) {
    await Book.create(req.body)
      .then(book => {
        res.send(book);
      })
      .catch(next);
  },
  async delete(req, res) {
    const id = req.params.id;
    try {
      await Book.findByIdAndDelete({ _id: id }).then(book => {
        res.send(book);
      });
    } catch (err) {
      console.log("Erro ao deletar livro");
    }
  },
  async update(req, res) {
    const id = req.params.id;
    try {
      await Book.findByIdAndUpdate({ _id: id }, req.body).then(book => {
        res.send(book);
      });
    } catch (err) {
      console.log("Erro ao atualizar as informações");
    }
  }
};
