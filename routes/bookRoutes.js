const express = require("express");
const router = express.Router();
const booksController = require("../controllers/booksController");
const { verifyToken } = require("../middlewares/auth/auth.middleware");

router.post("/", verifyToken, booksController.addBook);
router.get("/", booksController.getAllBookList);
router.get("/:id", booksController.getBookById);
router.put("/:id", verifyToken, booksController.updateBook);
router.delete("/:id", verifyToken, booksController.removeBookById);

module.exports = router;
