import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the database connection
import returnsRoute from "./routes/return.route.js"; // Updated to use the correct returns route
import salesRoute from "./routes/sales.route.js"; // Updated to use the correct returns route
import route from "./routes/user.route.js";
import cust from "./routes/customer.route.js";
import Delivery from "./routes/delivery.route.js";

dotenv.config(); // Load environment variables

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
connectDB();

// Basic home route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/returns", returnsRoute); // Updated to use 'returnsRoute'
app.use("/api/sales", salesRoute);

//Delivery
app.use("/api/user", route);
app.use("/api/cust", cust);
app.use("/api/deliv", Delivery);

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
