import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the database connection

dotenv.config(); // Load environment variables

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Basic home route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (optional, can expand it)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Define port from environment or use default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
