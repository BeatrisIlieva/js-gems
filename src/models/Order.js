const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jewelryId: {
    type: mongoose.Types.ObjectId,
    ref: "Earring",
    required: true,
  },
  sizeId: {
    type: mongoose.Types.ObjectId,
    ref: "Size",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const order = mongoose.model("Order", orderSchema);

module.exports = order;