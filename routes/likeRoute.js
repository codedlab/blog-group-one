import  express from "express";
import likeControllers from "../controllers/likecontrollers.js";
const router=express.Router();

router.post("/", likeControllers.registerlike);
// router.put("/:id", likeControllers.updatelike);
// router.get("/:id", likeControllers.getlike);
router.get("/", likeControllers.getAlllikesByPostId);
router.delete("/:id",likeControllers.deletelike);

export default router;