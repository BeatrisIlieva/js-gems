const mongoose = require("mongoose");

const jewelryMetalsSchema = new mongoose.Schema({
  jewelry: {
    type: Number,
    ref: "Jewelry",
    required: true,
  },
  metal: {
    type: Number,
    ref: "Metal",
    required: true,
  },
  caratWeight: {
    type: mongoose.Decimal128,
    required: false,
  }
});

const jewelryMetals = mongoose.model("JewelryMetals", jewelryMetalsSchema);

module.exports = jewelryMetals;
