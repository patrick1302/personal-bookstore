const express = require("express");

const router = express.Router();
const BookConnection = require("./controllers/BookController");
const UserConnection = require("./controllers/UserController");
const middleware = require("./middleware/auth");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

//book

// GET /books?acquired=true
// GET /books?limit=10&skip=20
// GET /books?sortBy=createdAt:desc
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
router.get("/user/me/avatar", middleware.auth, UserConnection.getAvatar);
router.post(
  "/user/me/avatar",
  middleware.auth,
  upload.single("avatar"),
  UserConnection.upload,
  UserConnection.handleErrorUpload
);
router.delete("/user/me/avatar", middleware.auth, UserConnection.deleteAvatar);

module.exports = router;
