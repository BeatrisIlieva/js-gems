const mongoose = require("mongoose");

const shoppingBagSchema = new mongoose.Schema({
  userId: {
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

const shoppingBag = mongoose.model("ShoppingBag", shoppingBagSchema);

module.exports = shoppingBag;
