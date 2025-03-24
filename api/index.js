require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

console.log("Connecting to MongoDB Atlas...");

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log("Connected to MongoDB successfully");

  // Start the server only after a successful DB connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB connection error occurred:", err.message);
  process.exit(1); // Exit the process with an error code
});

// Import routes
const userRoutes = require("../routes/ProductRoutes");
const UserBuyRoutes = require("../routes/UserBuyRoutes");
const UserDetail = require("../routes/UserDetail");
const paymentRoutes = require('../routes/paymentRoutes');

// Use routes
app.use("/users", userRoutes);
app.use("/userbuy", UserBuyRoutes);
app.use("/userdetail", UserDetail);
app.use('/paymentroutes',paymentRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API working properly");
});

module.exports = app;
