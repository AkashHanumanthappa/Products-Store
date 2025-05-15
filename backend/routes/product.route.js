import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getMyProducts, // ✅ Add this
} from "../controller/products.controller.js";
import { protect } from "../middleware/product.auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/my-products", protect, getMyProducts); // ✅ New route
router.post("/create", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
