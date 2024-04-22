const mongoose = require("mongoose");

const shoppingBagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jewelry: {
    type: Number,
    ref: "Jewelry",
    required: true,
  },
  size: {
    type: Number,
    ref: "Size",
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const shoppingBag = mongoose.model("ShoppingBag", shoppingBagSchema);

module.exports = shoppingBag;
