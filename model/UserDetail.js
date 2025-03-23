const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  mobile:Number,
  state:String,
  district:String,
  village:String,
  pincode:Number,
  nearby:String
  
});

module.exports = mongoose.model("UserDetail", userSchema);
