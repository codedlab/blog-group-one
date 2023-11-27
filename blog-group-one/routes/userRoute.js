import express from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validations/userValidation.js";
import postController from "../controllers/postController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post(
  "/login",
  authUser.authentication,
  userController.loginUser,
  postController.getAllPosts
);

router.post("/", userController.registerUser);
router.put("/:id", userValidation, userController.updateUser);
router.get("/posts", authUser.verifyAuth, userController.userPost);
router.get("/:id", userController.getUser);
router.get("/", userController.getallUser);
router.delete("/:id", userController.deleteUser);

export default router;
