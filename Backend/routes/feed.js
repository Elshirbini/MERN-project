const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/feed");
const { authMiddleware } = require("../middleware/is-Auth");

const router = express.Router();

router.get("/posts", authMiddleware, feedController.getPosts);

router.post(
  "/post",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get("/post/:postId", authMiddleware, feedController.getPost);

router.put(
  "/post/:postId",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/post/:postId", authMiddleware, feedController.deletePost);

module.exports = router;
