require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); 
app.use(cors()); 

console.log("Database URL is:", process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const userRoutes = require("../routes/ProductRoutes");
const UserBuyRoutes = require('../routes/UserBuyRoutes');
const UserDetail = require('../routes/UserDetail');

app.use("/users", userRoutes);
app.use('/userbuy',UserBuyRoutes)
app.use('/userdetail',UserDetail)

app.get('/',(req,res)=>{
  res.send("api working properly")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
