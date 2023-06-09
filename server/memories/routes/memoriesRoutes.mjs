import express from "express";
import {
  createMemory,
  getMemory,
  getMemories,
  editMemory,
  shareMemory,
  deleteMemory,
  likeMemory,
} from "../controllers/memory.mjs";
import auth from "../../auth/authService.mjs";
const router = express.Router();

router.get("/", auth, getMemories);
router.get("/:memoryId", auth, getMemory);
router.post("/", auth, createMemory);
router.put("/:memoryId", auth, editMemory);
router.patch("/:memoryId", auth, shareMemory);
router.patch("/like/:memoryId", auth, likeMemory);
router.delete("/:memoryId", auth, deleteMemory);

export default router;
