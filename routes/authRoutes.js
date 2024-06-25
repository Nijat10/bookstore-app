const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/registration",
  [
    body("fullname").not().isEmpty().withMessage("Fullname is required"),
    body("email").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.registration
);
router.post(
  "/login",
  [body("email").not().isEmpty(), body("password").isLength({ min: 5 })],
  authController.login
);

module.exports = router;
