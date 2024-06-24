const { Book } = require("../models");

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // default values for page and limit
    const offset = (page - 1) * limit;

    const books = await Book.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalBooks = await Book.count();
    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages,
      totalBooks,
      books,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBookList = getAllBookList;
exports.getBookById = getBookById;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.removeBookById = removeBookById;
