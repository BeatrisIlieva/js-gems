const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = wishlist;
