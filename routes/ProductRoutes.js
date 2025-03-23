const express = require("express");
const User = require("../model/Product");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { category, imageurl, title, description, oldprice, newprice } = req.body;
    const newUser = new User({ category, imageurl, title, description, oldprice, newprice });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Detailed error:", error); // Log the full error
    res.status(500).json({ message: "Error creating user", error: error.message }); // Send error message
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
});

module.exports = router;