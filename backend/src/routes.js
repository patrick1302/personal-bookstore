const express = require("express");

const router = express.Router();
const BookConnection = require("./controllers/BookController");

router.get("/books", BookConnection.list);
router.post("/books", BookConnection.create);
router.delete("/books/:id", BookConnection.delete);
router.put("/books/:id", BookConnection.update);

module.exports = router;
