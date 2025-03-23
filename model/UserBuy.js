const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  category: String,
  imageurl:String,
  title:String,
  newprice:Number,
  size:String,
  quantity:Number,
  
});

module.exports = mongoose.model("UserBuy", userSchema);
