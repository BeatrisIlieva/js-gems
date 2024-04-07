const mongoose = require("mongoose");

const stoneCaratWeightSchema = new mongoose.Schema({
  title: {
    type: mongoose.Decimal128,
    required: true,
  },
});

const stoneCaratWeight = mongoose.model("StoneCaratWeight", stoneCaratWeightSchema);

module.exports = stoneCaratWeight;
