const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  pin: { type: Number, required: true },
  house: { type: String, required: true },
  area: { type: String},
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
