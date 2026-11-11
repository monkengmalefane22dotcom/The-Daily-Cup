
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const redis = require("./config/redis");

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to The Daily Cup API!");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "The Daily Cup API is healthy!"
  });
});

// API routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;

redis.set("connection_test", "The Daily Cup is connected!")
  .then(() => redis.get("connection_test"))
  .then((result) => {
    console.log("Upstash connection successful:", result);
  })
  .catch((error) => {
    console.error("Upstash connection failed:", error.message);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
