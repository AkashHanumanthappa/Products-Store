import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controller/user.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes (no authentication required)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (authentication required)
router.get("/all", authenticate, getAllUsers);

// Admin-only routes
router.delete("/:id", authenticate, authorizeRoles("admin"), deleteUser);

export default router;
