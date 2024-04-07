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
  },
  sizeId: {
    type: mongoose.Types.ObjectId,
    ref: "Size",
    required: true,
  },
});

const jewelry = mongoose.model("Jewelry", jewelrySchema);

module.exports = jewelry;
