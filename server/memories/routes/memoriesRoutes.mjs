import express from "express";
import { createMemory, getMemory } from "../controllers/memory.mjs";
const router = express.Router();
// import auth from "../../auth/authService.mjs";

router.get("/", getMemory);
router.post("/", createMemory);

export default router;
