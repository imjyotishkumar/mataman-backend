const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  category: String,
  imageurl:String,
  title:String,
  description:String,
  oldprice: Number,
  newprice:Number,
});

module.exports = mongoose.model("User", userSchema);
