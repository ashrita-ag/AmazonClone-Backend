const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: Number, required: true },
  checked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
