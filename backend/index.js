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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewarer
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));



// Add security headers to address CSP issues
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';");
  next();
});

// Static files for all environments
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Root route for development mode
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Serve frontend (in production only)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});