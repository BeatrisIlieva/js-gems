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
});

const wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = wishlist;
