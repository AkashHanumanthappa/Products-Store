import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controller/user.controller.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;
