import { connectDB } from './config/db.js';
import express from 'express';
import productRoutes from "./routes/product.route.js"
import Product from './models/product.models.js';
import User from './models/user.model.js'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/user",userRoutes );

  
  app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
  });
// fLxEXhfDURWkR1Bi