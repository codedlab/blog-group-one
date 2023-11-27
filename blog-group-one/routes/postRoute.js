import express from "express";
import postController from "../controllers/postController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/", authUser.verifyAuth, postController.createPost);
router.get("/:id", authUser.verifyAuth, postController.getPost);
router.get("/", authUser.verifyAuth, postController.getAllPosts);
router.put("/:id", authUser.verifyAuth, postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;
