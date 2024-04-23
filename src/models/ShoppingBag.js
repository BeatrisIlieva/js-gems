const mongoose = require("mongoose");

const shoppingBagSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
    required: false,
    // sparse: true, // Allows null values to be indexed
    // unique: true,
  },
  session: {
    type: String,
    default: null,
    required: false,
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
