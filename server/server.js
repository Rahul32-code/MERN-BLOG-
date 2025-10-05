import express from "express";
import path from "path";
import dotenv from "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.route.js";
import blogRoutes from "./routes/blog.route.js";

// Initialize environment variables
// dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __dirname = path.resolve();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS configuration for development environment
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: process.env.VITE_BASE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
}

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  // });
}

// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

export default app;
