const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Fname: { type: String, required: true },
    Lname: { type: String, default: " " },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 1 },
    cart: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
