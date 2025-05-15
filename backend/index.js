import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";  // Add this import

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // your React dev server URL
  credentials: true,                 // if you use cookies or authentication headers
}));
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: "10mb" }));       // for JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Parse JSON bodies

// Connect to MongoDB
connectDB(); // Call this before starting server for cleaner startup flow

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);      // Mount user routes (register, login, admin, etc.)

// Serve frontend in production

app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
});

// fLxEXhfDURWkR1Bi