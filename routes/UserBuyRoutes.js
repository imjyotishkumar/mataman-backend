const express = require("express");
const UserBuy = require("../model/UserBuy");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {category, imageurl, title, newprice, size, quantity } = req.body;
    const newUser = new UserBuy({ category, imageurl, title, newprice, size, quantity });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await UserBuy.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
module.exports = router;
