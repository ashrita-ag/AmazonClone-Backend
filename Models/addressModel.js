const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, required: [true, "UserID not provided"] },
  name: { type: String, required: [true, "Name not found!"] },
  phone: { type: Number, required: [true, "Phone number not found"] },
  pin: { type: Number, required: [true, "PIN Code is required."] },
  house: {
    type: String,
    required: [true, "Please fill all the required fields"],
  },
  area: { type: String },
  landmark: { type: String },
  city: {
    type: String,
    required: [true, "Please fill all the required fields"],
  },
  state: {
    type: String,
    required: [true, "Please fill all the required fields"],
  },
  country: {
    type: String,
    default: "India",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
