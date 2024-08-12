const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth');
const User = require("../models/user");
const { body } = require("express-validator");
const { authMiddleware } = require("../middleware/is-Auth");


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

router.post('/login'  , authController.login);

router.get('/status', authMiddleware  , authController.getStatus)

router.patch('/status', authMiddleware  , authController.updateStatus)


module.exports = router;
