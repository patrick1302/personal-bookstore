const express = require("express");

const router = express.Router();
const BookConnection = require("./controllers/BookController");
const RegisterConnection = require("./controllers/RegisterController");

//book
router.get("/books", BookConnection.list);
router.get("/books/:id", BookConnection.listOne);
router.post("/books", BookConnection.create);
router.delete("/books/:id", BookConnection.delete);
router.put("/books/:id", BookConnection.update);

//register
router.get("/registers", RegisterConnection.list);
router.post("/registers", RegisterConnection.create);

module.exports = router;
