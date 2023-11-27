import express from "express";
import likeControllers from "../controllers/likecontrollers.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/", authUser.verifyAuth, likeControllers.registerlike);
router.get("/", likeControllers.getAlllikes);
router.delete("/:id", authUser.verifyAuth, likeControllers.deletelike);

export default router;
