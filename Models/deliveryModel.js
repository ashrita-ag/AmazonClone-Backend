const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, required: true },
    gift: { type: Boolean, default: false },
    address: { type: mongoose.Mixed, default: {} },
    speed: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    finalcost: { type: Number, default: 0 },
    cart: { type: Array, default: [] },
    status: { type: Boolean, default: false }, // False:InProcess True:Success
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
