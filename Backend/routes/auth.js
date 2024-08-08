const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const User = require("../models/user");
const { body } = require("express-validator");

router.put("/signup", [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("This E-mail address has been exist");
        }
      });
    }).normalizeEmail(),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().not().isEmpty(),
] , authController.signup );

router.post('/login' , authController.login);

module.exports = router;
