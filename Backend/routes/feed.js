import express from "express";

import { body } from "express-validator";

import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/feed.js";
import { authMiddleware } from "../middleware/is-Auth.js";

const router = express.Router();

router.get("/posts", authMiddleware, getPosts);

router.post(
  "/post",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

router.get("/post/:postId", authMiddleware, getPost);

router.put(
  "/post/:postId",
  authMiddleware,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

router.delete("/post/:postId", authMiddleware, deletePost);

export default router;
