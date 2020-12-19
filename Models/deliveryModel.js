const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  user: { type: mongoose.ObjectId, required: true },
  gift: { type: Boolean, default: false },
  address: { type: mongoose.Mixed, default: {} },
  speed: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
});

module.exports = mongoose.model("Delivery", deliverySchema);
