const mongoose = require("mongoose");

const goldCaratWeightSchema = new mongoose.Schema({
  title: {
    type: mongoose.Decimal128,
    required: true,
  },
});

const goldCaratWeight = mongoose.model("GoldCaratWeight", goldCaratWeightSchema);

module.exports = goldCaratWeight;
