const express = require("express");

const router = express.Router();
const BookConnection = require("./controllers/BookController");
const UserConnection = require("./controllers/UserController");

//book
router.get("/books", BookConnection.list);
router.get("/books/:id", BookConnection.listOne);
router.post("/books", BookConnection.auth, BookConnection.create);
router.delete("/books/:id", BookConnection.delete);
router.put("/books/:id", BookConnection.update);

//signup
router.get("/users", UserConnection.list);
router.post("/users", UserConnection.create);
router.post("/login", UserConnection.login);

module.exports = router;
