const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jewelries: [],
  subTotal: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;