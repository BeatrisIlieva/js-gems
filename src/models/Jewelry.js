const mongoose = require("mongoose");
const Category = require("../models/Category");
const Metal = require("../models/Metal");
const Size = require("../models/Size");
const StoneType = require("../models/StoneType");
const StoneColor = require("../models/StoneColor");

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
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  metals: [{
    type: mongoose.Types.ObjectId,
    ref: "Metal",
    required: true,
  }],
  goldCaratWeight: {
    type: mongoose.Types.ObjectId,
    ref: "GoldCaratWeight",
    required: false,
  },
  stones: [{
    kind: {
      type: mongoose.Types.ObjectId,
      ref: "StoneType",
      required: true,
    },
    color: {
      type: mongoose.Types.ObjectId,
      ref: "StoneColor",
      required: true,
    },
    caratWeight: {
      type: mongoose.Decimal128,
      required: false,
    },
  }],
  sizes: [{
    type: mongoose.Types.ObjectId,
    ref: "Size",
    required: true,
  }],
});

const jewelry = mongoose.model("Jewelry", jewelrySchema);

module.exports = jewelry;


// const mongoose = require("mongoose");

// const jewelrySchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   firstImageUrl: {
//     type: String,
//     required: true,
//   },
//   secondImageUrl: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//   },
//   categoryId: {
//     type: mongoose.Types.ObjectId,
//     ref: "Category",
//     required: true,
//   },
//   metalId: {
//     type: mongoose.Types.ObjectId,
//     ref: "Metal",
//     required: true,
//   },
//   goldCaratWeightId: {
//     type: mongoose.Types.ObjectId,
//     ref: "GoldCaratWeight",
//     required: false,
//   },
//   stoneTypeId: [{
//     type: mongoose.Types.ObjectId,
//     ref: "StoneType",
//     required: true,
//   }],
//   stoneColorId: [{
//     type: mongoose.Types.ObjectId,
//     ref: "StoneColor",
//     required: true,
//   }],
//   stoneCaratWeightId: {
//     type: mongoose.Types.ObjectId,
//     ref: "StoneCaratWeight",
//     required: false,
//   },
//   sizeId: [{
//     type: mongoose.Types.ObjectId,
//     ref: "Size",
//     required: true,
//   }],
// });

// const jewelry = mongoose.model("Jewelry", jewelrySchema);

// module.exports = jewelry;
