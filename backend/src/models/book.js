const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  publisher: {
    type: String,
    trim: true,
  },
  acquired: {
    type: Boolean,
    default: false,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
