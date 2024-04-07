const mongoose = require("mongoose");

const jewelrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  firstImageUrl: {
    type: String,
    required: true,
  },
  secondImageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  metalId: {
    type: mongoose.Types.ObjectId,
    ref: "Metal",
    required: true,
  },
  goldCaratWeightId: {
    type: mongoose.Types.ObjectId,
    ref: "GoldCaratWeight",
    required: false,
  },
  stoneTypeId: {
    type: mongoose.Types.ObjectId,
    ref: "StoneType",
    required: true,
  },
  stoneColorId: {
    type: mongoose.Types.ObjectId,
    ref: "StoneColor",
    required: true,
  },
  stoneCaratWeightId: {
    type: mongoose.Types.ObjectId,
    ref: "StoneCaratWeight",
    required: false,
  },
});

const jewelry = mongoose.model("Jewelry", jewelrySchema);

module.exports = jewelry;
