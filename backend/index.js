import events from "events";
events.EventEmitter.defaultMaxListeners = 20;
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

// Load environment variables
dotenv.config();

// Fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __dirname = path.resolve();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:3000", "https://products-store-frontend.onrender.com", "https://verdant-basbousa-3c8aff.netlify.app", "https://products-store-akash-h.onrender.com"], // Add all allowed origins
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// // Serve frontend (in production only)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
