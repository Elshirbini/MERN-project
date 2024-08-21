import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { signup, login, getStatus, updateStatus } from "../controllers/auth.js";

import { User } from "../models/user.js";

import { body } from "express-validator";

import { authMiddleware } from "../middleware/is-Auth.js";

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("This E-mail address has been exist");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

router.get("/status", authMiddleware, getStatus);

router.patch("/status", authMiddleware, updateStatus);

export default router;
