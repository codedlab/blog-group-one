import express from "express";
import userController from "../controllers/userController.js";
import userValidation from "../validations/userValidation.js";
import authentication from "../middleware/authUser.js";

const router = express.Router();
router.post(
  "/login",
  authentication,
  userController.loginUser,
  userController.getUser
);

router.post("/", userValidation, userController.registerUser);
router.put("/:id", userValidation, userController.updateUser);
router.get("/:id", userController.getUser);
router.get("/", userController.getallUser);
router.delete("/:id", userController.deleteUser);

export default router;
