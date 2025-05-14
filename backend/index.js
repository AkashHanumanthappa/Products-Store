import { connectDB } from './config/db.js';
import express from 'express';
import productRoutes from "./routes/product.route.js"
import Product from './models/product.models.js';
import User from './models/user.model.js'
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import session from 'express-session';
import MongoStore from 'connect-mongo';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use("/api/products",productRoutes);
app.use("/api/user",userRoutes );

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
    sameSite: 'lax',
    httpOnly: true,
    secure: false // set to true in production with HTTPS
  }
}));
  
  app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
  });
// fLxEXhfDURWkR1Bi