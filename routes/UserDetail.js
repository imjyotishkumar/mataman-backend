const express = require("express");
const UserDetail = require("../model/UserDetail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {name, email, mobile, state, district, village, pincode, nearby } = req.body;
    const newUser = new UserDetail({name, email, mobile, state, district, village, pincode, nearby });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await UserDetail.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
module.exports = router;
