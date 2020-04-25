const express = require("express");

const router = express.Router();
const BookConnection = require("./controllers/BookController");
const UserConnection = require("./controllers/UserController");
const middleware = require("./middleware/auth");

//book
router.get("/books", middleware.auth, BookConnection.list);
router.get("/book/:id", middleware.auth, BookConnection.listOne);
router.post("/books", middleware.auth, BookConnection.create);
router.delete("/books/:id", middleware.auth, BookConnection.delete);
router.put("/book/:id", middleware.auth, BookConnection.update);

//users
router.get("/users/me", middleware.auth, UserConnection.list);
router.post("/users/logout", middleware.auth, UserConnection.logout);
router.post("/users/logoutAll", middleware.auth, UserConnection.logoutAll);
router.post("/users", UserConnection.create);
router.post("/users/login", UserConnection.login);
router.delete("/user/me", middleware.auth, UserConnection.delete);

module.exports = router;
