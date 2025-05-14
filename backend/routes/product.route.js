import express from 'express';
import Product from '../models/product.models.js';
import { getProduct, createProduct, deleteProduct,updateProduct} from '../controller/products.controller.js';


const router=express.Router();

router.post("/", createProduct);
router.delete("/:id",deleteProduct);
router.get("/",getProduct);
router.put("/:id",updateProduct);
export default router;