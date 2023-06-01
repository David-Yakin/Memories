import express from "express";
import {
  getUser,
  login,
  register,
  getAllUsers,
  deleteUser,
  editUser,
  getUserProfile,
} from "../controllers/users.mjs";
import auth from "../../auth/authService.mjs";
const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.get("/profile", auth, getUserProfile);
router.get("/:id", auth, getUser);
router.get("/", auth, getAllUsers);
router.delete("/:id", auth, deleteUser);
router.put("/", auth, editUser);

export default router;
