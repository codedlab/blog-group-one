import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.get("/:id", postController.getPost);
router.get("/", postController.getAllPosts);
router.delete("/:id", postController.deletePost);

export default router;
